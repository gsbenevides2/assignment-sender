import axios, { AxiosInstance } from 'axios'

import {
  CourseList,
  CourseWorkList,
  Course,
  CourseWork,
  StudentSubmission,
  StudentSubmissionList
} from './classroomTypes'

interface PendentCourseWork {
  id: string
  name: string
  courseName: string
  courseWorkId: string
  courseId: string
}
export default class GoogleClassroomService {
  _api: AxiosInstance
  constructor(accessToken: string) {
    this._api = axios.create({
      url: 'https://classroom.googleapis.com/v1',
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    })
  }

  _listCourse(): Promise<Course[]> {
    return new Promise(async resolve => {
      let courses: Course[] = []
      let pageToken: undefined | string
      while (true) {
        const result = await this._api.get<CourseList>('/courses', {
          params: {
            studentId: 'me',
            courseStates: 'ACTIVE',
            pageToken
          }
        })
        courses = [...courses, ...result.data.courses]
        if (result.data.nextPageToken) {
          pageToken = result.data.nextPageToken
        } else {
          resolve(courses)
          break
        }
      }
    })
  }

  _listCourseWork(courseId: string): Promise<CourseWork[]> {
    return new Promise(async resolve => {
      let courseWorks: CourseWork[] = []
      let pageToken: undefined | string
      while (true) {
        const result = await this._api.get<CourseWorkList>(
          `/courses/${courseId}/courseWork`,
          {
            params: {
              courseWorkStates: 'PUBLISHED',
              pageToken
            }
          }
        )
        courseWorks = [...courseWorks, ...result.data.courseWork]
        if (result.data.nextPageToken) {
          pageToken = result.data.nextPageToken
        } else {
          resolve(courseWorks)
          break
        }
      }
    })
  }

  _listStudentSubmissions(
    courseId: string,
    courseWorkId: string
  ): Promise<StudentSubmission[]> {
    return new Promise(async resolve => {
      let studentSubmissions: StudentSubmission[] = []
      let pageToken: undefined | string
      while (true) {
        const result = await this._api.get<StudentSubmissionList>(
          `/courses/${courseId}/courseWork/${courseWorkId}/studentSubmissions`,
          {
            params: {
              states: ['NEW', 'CREATED', 'RECLAIMED_BY_STUDENT'].join(','),
              pageToken
            }
          }
        )
        studentSubmissions = [
          ...studentSubmissions,
          ...result.data.studentSubmissions
        ]
        if (result.data.nextPageToken) {
          pageToken = result.data.nextPageToken
        } else {
          resolve(studentSubmissions)
          break
        }
      }
    })
  }

  getAllPendentCourseWorks(): Promise<PendentCourseWork[]> {
    return new Promise(async (resolve, reject) => {
      const pendentCourseWorks: PendentCourseWork[] = []
      const courses = await this._listCourses()
      const promises = courses.map(async course => {
        const courseWorks = await this._listCourseWorks(course.id)
        const promises = courseWorks.map(async courseWork => {
          const studentSubmissions = await this._listStudentSubmissions(
            course.id,
            courseWork.id
          )
          if (studentSubmissions.length) {
            pendentCourseWorks.push({
              id: course.id + courseWork.id,
              name: courseWork.title,
              courseWorkId: courseWork.id,
              courseId: course.id,
              courseName: course.name
            })
          }
        })
        if (promises) Promise.all(promises)
      })
      if (promises) await Promise.all(promises)
      resolve(pendentCourseWorks)
    })
  }
}
