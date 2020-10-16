type CourseState =
  | 'COURSE_STATE_UNSPECIFIED'
  | 'ACTIVE'
  | 'ARCHIVED'
  | 'PROVISIONED'
  | 'DECLINED'
  | 'SUSPENDED'
type DriveFolder = {
  id: string
  title: string
  alternateLink: string
}
type DriveFile = {
  id: string
  title: string
  alternateLink: string
  thumbnailUrl: string
}
type YouTubeVideo = DriveFile

type Link = {
  url: string
  title: string
  thumbnailUrl: string
}
type Form = {
  formUrl: string
  responseUrl: string
  title: string
  thumbnailUrl: string
}
type CourseMaterial = {
  driveFile: DriveFile
  youTubeVideo: YouTubeVideo
  link: Link
  form: Form
}
type CourseMaterialSet = {
  title: string
  materials: Array<CourseMaterial>
}
export interface Course {
  id: string
  name: string
  section: string
  descriptionHeading: string
  description: string
  room: string
  ownerId: string
  creationTime: string
  updateTime: string
  enrollmentCode: string
  courseState: CourseState
  alternateLink: string
  teacherGroupEmail: string
  courseGroupEmail: string
  teacherFolder: DriveFolder
  courseMaterialSets: Array<CourseMaterialSet>
  guardiansEnabled: boolean
  calendarId: string
}

export interface CourseList {
  courses: Array<Course>
  nextPageToken?: string
}
type ShareMode = 'UNKNOWN_SHARE_MODE' | 'VIEW' | 'EDIT' | 'STUDENT_COPY'
type SharedDriveFile = {
  driveFile: DriveFile
  shareMode: ShareMode
}
type Material = {
  driveFile: SharedDriveFile
  youtubeVideo: YouTubeVideo
  link: Link
  form: Form
}
type CourseWorkState =
  | 'COURSE_WORK_UNSPECIFIED'
  | 'PUBLISHED'
  | 'DRAFT'
  | 'DELETED'
type CourseWorkType =
  | 'COURSE_WORK_TYPE_UNSPECIFIED'
  | 'ASSIGNMENT'
  | 'SHORT_ANSWER_QUESTION'
  | 'MULTIPLE_CHOICE_QUESTION'
type Date = {
  year: number
  month: number
  day: number
}
type TimeOfDay = {
  hours: number
  minutes: number
  seconds: number
  nanos: number
}
type AssigneeMode =
  | 'ASSIGNEE_MODE_UNSPECIFIED'
  | 'ALL_STUDENTS'
  | 'INDIVIDUAL_STUDENTS'
type IndividualStudentsOptions = {
  studentIds: Array<string>
}
type SubmissionModificationMode =
  | 'SUBMISSION_MODIFICATION_MODE_UNSPECIFIED'
  | 'MODIFIABLE_UNTIL_TURNED_IN'
  | 'MODIFIABLE'
type Assignment = {
  studentWorkFolder: DriveFolder
}
type MultipleChoiceQuestion = {
  choices: Array<string>
}
export interface CourseWork {
  courseId: string
  id: string
  title: string
  description: string
  materials: Array<Material>
  state: CourseWorkState
  alternateLink: string
  creationTime: string
  updateTime: string
  dueDate: Date
  dueTime: TimeOfDay
  scheduledTime: string
  maxPoints: number
  workType: CourseWorkType
  associatedWithDeveloper: boolean
  assigneeMode: AssigneeMode
  individualStudentsOptions: IndividualStudentsOptions
  submissionModificationMode: SubmissionModificationMode
  creatorUserId: string
  topicId: string
  assignment: Assignment
  multipleChoiceQuestion: MultipleChoiceQuestion
}

export interface CourseWorkList {
  courseWork: Array<CourseWork>
  nextPageToken?: string
}

type SubmissionState =
  | 'SUBMISSION_STATE_UNSPECIFIED'
  | 'NEW'
  | 'CREATED'
  | 'TURNED_IN'
  | 'RETURNED'
  | 'RECLAIMED_BY_STUDENT'
type State =
  | 'STATE_UNSPECIFIED'
  | 'NEW'
  | 'CREATED'
  | 'TURNED_IN'
  | 'RETURNED'
  | 'RECLAIMED_BY_STUDENT'
type StateHistory = {
  state: State
  stateTimestamp: string
  actorUserId: string
}
type GradeChangeType =
  | 'UNKNOWN_GRADE_CHANGE_TYPE'
  | 'DRAFT_GRADE_POINTS_EARNED_CHANGE'
  | 'ASSIGNED_GRADE_POINTS_EARNED_CHANGE'
  | 'MAX_POINTS_CHANGE'
type GradeHistory = {
  pointsEarned: number
  maxPoints: number
  gradeTimestamp: string
  actorUserId: string
  gradeChangeType: GradeChangeType
}
type SubmissionHistory = {
  stateHistory: StateHistory
  gradeHistory: GradeHistory
}
type Attachment = {
  driveFile: DriveFile
  youTubeVideo: YouTubeVideo
  link: Link
  form: Form
}
type AssignmentSubmission = {
  attachments: Array<Attachment>
}
type ShortAnswerSubmission = {
  answer: string
}
type MultipleChoiceQuestion = {
  answer: string
}
export interface StudentSubmission {
  courseId: string
  courseWorkId: string
  id: string
  userId: string
  creationTime: string
  updateTime: string
  state: SubmissionState
  late: boolean
  draftGrade: number
  assignedGrade: number
  alternateLink: string
  courseWorkType: CourseWorkType
  associatedWithDeveloper: boolean
  submissionHistory: Array<SubmissionHistory>
  assignmentSubmission: AssignmentSubmission
  shortAnswerSubmission: ShortAnswerSubmission
  multipleChoiceSubmission: MultipleChoiceSubmission
}
export interface StudentSubmissionList {
  studentSubmissions: Array<StudentSubmission>
  nextPageToken?: string
}
