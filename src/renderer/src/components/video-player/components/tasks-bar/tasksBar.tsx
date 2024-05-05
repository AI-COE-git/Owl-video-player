import { useOpenFileMutation } from '../../../../../store/api-slices/fileSlice'
import { setNewFile } from '../../../../../store/reducers/videoReducer'
import { useAppDispatch } from '../../../../../store/store'
import { loadVideo } from '../../helpers'
import { FileInput, TaskbarContainer } from './style'

const Tasksbar: React.FC = () => {
  const dispatch = useAppDispatch()
  const [openFile] = useOpenFileMutation()

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList && fileList.length > 0) {
      const file = fileList[0]
      const videoElem = await loadVideo(file)
      const fileDetails = {
        src: videoElem.src,
        path: file.path,
        duration: videoElem.duration,
        name: file.name
      }
      dispatch(setNewFile(fileDetails))
      await openFile(fileDetails)
    }
  }
  return (
    <TaskbarContainer>
      <FileInput
        id="fileInput"
        type="file"
        accept="video/mp4, video/webm, video/ogg"
        onChange={handleFileInputChange}
      />
    </TaskbarContainer>
  )
}

export default Tasksbar
