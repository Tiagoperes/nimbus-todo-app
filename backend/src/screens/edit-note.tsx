import { condition, createState, eq, NimbusJSX } from '@zup-it/nimbus-backend-core'
import { Screen, ScreenRequest } from '@zup-it/nimbus-backend-express'
import { Column, Row, Text } from '@zup-it/nimbus-backend-layout'
import { log, sendRequest } from '@zup-it/nimbus-backend-core/actions'
import { DatePicker } from '../components/DatePicker'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'
import { Note, NoteSection } from '../types'
import { emptyNoteId, todoAPIKey, todoAPIUrl } from '../constants'

interface EditNoteScreenRequest extends ScreenRequest {
  state: {
    note: Note,
  },
  events: {
    onSaveNote: NoteSection[],
  }
}

export const EditNote: Screen<EditNoteScreenRequest> = ({ getViewState, navigator, triggerViewEvent }) => {
  const note = getViewState('note') // fixme: remove explicit type, this seems to be a bug with vscode + linked package
  const title = createState('title', note.get('title'))
  const description = createState('description', note.get('description'))
  const date = createState('date', note.get('date'))

  const save = sendRequest<NoteSection[]>({
    url: todoAPIUrl,
    method: condition(eq(note.get('id'), emptyNoteId), 'Post', 'Put'),
    headers: { key: todoAPIKey() },
    data: { id: note.get('id'), title, description, date, isDone: note.get('isDone') },
    onSuccess: (response) => [
      log({ message: response.get('data') }),
      triggerViewEvent('onSaveNote', response.get('data')),
      navigator.dismiss(),
    ],
    onError: (error) => log({ level: 'error', message: error.get('message') }),
  })

  return (
    <Column state={[title, description, date]} width="expand" height="expand" backgroundColor="#F1F3F5" mainAxisAlignment="center" crossAxisAlignment="center">
      <Text color="#616B76" size={18} weight="bold">
        {condition(eq(note.get('id'), emptyNoteId), 'Creating note', 'Editing note')}
      </Text>
      <Column margin={30} padding={20} backgroundColor="#FFFFFF" borderColor="#E0E4E9" borderWidth={1} cornerRadius={8}>
        <TextInput label="Title" value={title} onChange={value => title.set(value)} />
        <Column marginVertical={10}>
          <TextInput label="Description" value={description} onChange={value => description.set(value)} />
        </Column>
        <DatePicker label="Date" value={date} onChange={(newValue) => date.set(newValue)} />
        <Row marginTop={20} width="expand" mainAxisAlignment="center">
          <Column marginEnd={20}>
            <Button onPress={navigator.dismiss()}>Cancel</Button>
          </Column>
          <Button primary onPress={save}>Save</Button>
        </Row>
      </Column>
    </Column>
  )
}
