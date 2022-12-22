import { all, takeLatest } from 'redux-saga/effects'
import { fetchSelfSaga } from './fetchSelfSaga'
import { registerMyselfSaga } from './registerMyselfSaga'
import { removeWorkExperienceSaga } from './removeWorkExperienceSaga'
import { Step1Saga } from './CoreInformation/Step1'
import { Step2AddSaga } from './CoreInformation/Step2Add'
import { Step2UpdateSaga } from './CoreInformation/Step2Update'
import { Step3Saga } from './CoreInformation/Step3'
import { Step4Saga } from './CoreInformation/Step4'
import { CompleteSaga } from './CoreInformation/complete'
import { insertWorkExperienceSaga } from './insertWorkExperienceSaga'
import { addEducationSaga } from './addEducationSaga'
import { updateEducationSaga } from './updateEducationSaga'
import { removeEducationSaga } from './removeEducationSaga'
import { addCourseSaga } from './addCourseSaga'
import { updateCourseSaga } from './updateCourseSaga'
import { removeCourseSaga } from './removeCourseSaga'
import { updateCompetenciesSaga } from './updateCompetenciesSaga'
import { setSalaryDataSaga } from './setSalaryDataSaga'
import { setLegalTermsSaga } from './setLegalTermsSaga'
import { changeWorkTermsSaga } from './changeWorkTermsSaga'
import { setCandidatePictureSaga } from './setCandidatePictureSaga'
import { updateHobbiesSaga } from './updateHobbiesSaga'
import { setCandidateCurriculumVitaeSaga } from './setCandidateCurriculumVitaeSaga'
import { setSettingsSaga } from './setSettingsSaga'
import { fetchAppliedJobIdsSaga } from './fetchAppliedJobIdsSaga'

function* candidateProfileSaga() {
  yield all([
    takeLatest('candidateProfile/getSelfRequest', fetchSelfSaga),
    takeLatest('candidateProfile/registerSelfRequest', registerMyselfSaga),
    takeLatest('candidateProfile/updateCoreInformationStep1', Step1Saga),
    takeLatest('candidateProfile/updateCoreInformationStep2Add', Step2AddSaga),
    takeLatest(
      'candidateProfile/updateCoreInformationStep2Update',
      Step2UpdateSaga
    ),
    takeLatest('candidateProfile/updateCoreInformationStep3', Step3Saga),
    takeLatest('candidateProfile/updateCoreInformationStep4', Step4Saga),
    takeLatest('candidateProfile/completeCoreInformation', CompleteSaga),
    takeLatest('candidateProfile/addWorkExperience', insertWorkExperienceSaga),
    takeLatest(
      'candidateProfile/updateWorkExperience',
      insertWorkExperienceSaga
    ),
    takeLatest(
      'candidateProfile/removeWorkExperience',
      removeWorkExperienceSaga
    ),
    takeLatest('candidateProfile/addEducation', addEducationSaga),
    takeLatest('candidateProfile/updateEducation', updateEducationSaga),
    takeLatest('candidateProfile/removeEducation', removeEducationSaga),
    takeLatest('candidateProfile/addCourse', addCourseSaga),
    takeLatest('candidateProfile/updateCourse', updateCourseSaga),
    takeLatest('candidateProfile/removeCourse', removeCourseSaga),
    takeLatest('candidateProfile/updateCompetencies', updateCompetenciesSaga),
    takeLatest('candidateProfile/setWorkTerms', changeWorkTermsSaga),
    takeLatest('candidateProfile/setSalaryData', setSalaryDataSaga),
    takeLatest('candidateProfile/setLegalTerms', setLegalTermsSaga),
    takeLatest('candidateProfile/setCandidatePicture', setCandidatePictureSaga),
    takeLatest('candidateProfile/updateHobbies', updateHobbiesSaga),
    takeLatest(
      'candidateProfile/setCandidateCurriculumVitae',
      setCandidateCurriculumVitaeSaga
    ),
    takeLatest('candidateProfile/setSettings', setSettingsSaga),
    takeLatest(
      'candidateProfile/getCandidateAppliedJobIds',
      fetchAppliedJobIdsSaga
    )
  ])
}

export default candidateProfileSaga
