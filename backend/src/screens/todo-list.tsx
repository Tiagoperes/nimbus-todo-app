import { createState, NimbusJSX, If, Then, Else, ForEach, State, contains, lowercase, or, eq, not, and } from '@zup-it/nimbus-backend-core'
import { sendRequest, log } from '@zup-it/nimbus-backend-core/actions'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Lifecycle, Text, Column, Row, ScreenComponent, ScrollView, Stack, Positioned } from '@zup-it/nimbus-backend-layout'
import { NoteCard } from '../fragments/NoteCard'
import { Icon } from '../components/Icon'
import { SelectionGroup } from '../components/SelectionGroup'
import { TextInput } from '../components/TextInput'
import { Note, NoteSection } from '../types'
import { Separator } from '../fragments/Separator'
import { formatDate } from '../operations/format-date'
import { EditNote } from '../screens/edit-note'
import { CircularButton } from '../components/CircularButton'
import { todoAPIKey, todoAPIUrl } from '../constants'

function shouldRender(note: State<Note>, searchTerm: State<string>, doneFilter: State<'All' | 'To do' | 'Done'>) {
  const lowerSearchTerm = lowercase(searchTerm)
  const lowerTitle = lowercase(note.get('title'))
  const lowerDescription = lowercase(note.get('description'))
  const titleMatches = contains(lowerTitle, lowerSearchTerm)
  const descriptionMatches = contains(lowerDescription, lowerSearchTerm)
  const matchesText = or(titleMatches, descriptionMatches)
  const matchesDone = and(eq(doneFilter, 'Done'), note.get('isDone'))
  const matchesToDo = and(eq(doneFilter, 'To do'), not(note.get('isDone')))
  const matchesDoneFilter = or(eq(doneFilter, 'All'), matchesDone, matchesToDo)
  return and(matchesDoneFilter, matchesText)
}

function emptyNote(): Note {
  return {
    id: 0,
    date: Date.now(),
    title: '',
    description: '',
    isDone: false,
  }
}

export const ToDoList: Screen = ({ navigator }) => {
  const searchTerm = createState('searchTerm', '')
  const doneFilter = createState<'All' | 'To do' | 'Done'>('doneFilter', 'All')
  const isLoading = createState('isLoading', true)
  const notes = createState<NoteSection[]>('notes', [])

  const loadItems = sendRequest<NoteSection[]>({
    url: `${todoAPIUrl}/notes`,
    headers: { key: todoAPIKey() },
    onSuccess: response => notes.set(response.get('data')),
    onError: response => log({ level: 'error', message: response.get('message') }),
    onFinish: isLoading.set(false),
  })

  const header = (
    <Row backgroundColor="#5F72C0" crossAxisAlignment="center" paddingHorizontal={20} height={65}>
      <Icon name="search" color="#FFFFFF" size={28} />
      <Row width="expand">
        <TextInput header color="#FFFFFF" label="Search" value={searchTerm} onChange={value => searchTerm.set(value)} />
      </Row>
      <SelectionGroup options={["All", "To do", "Done"]} value={doneFilter} onChange={value => doneFilter.set(value)} />
    </Row>
  )

  const body = (
    <ScrollView>
      <ForEach items={notes} key="date">
        {(section) => (
          <Column marginTop={5}>
            <Column paddingVertical={12} paddingHorizontal={20}>
              <Text size={16} color="#616B76">{formatDate(section.get('date'))}</Text>
            </Column>
            <Separator />
            <ForEach items={section.get('items')} key="id">
              {(item) => (
                <If condition={shouldRender(item, searchTerm, doneFilter)}>
                  <Then>
                    <NoteCard value={item} onShowEditModal={navigator.present(EditNote, { state: { note: item } })} />
                    <Separator />
                  </Then>
                </If>
              )}
            </ForEach>
          </Column>
        )}
      </ForEach>
    </ScrollView>
  )

  return (
    <ScreenComponent safeAreaTopBackground="#5F72C0" statusBarColorScheme="dark">
      <Lifecycle onInit={loadItems} state={[isLoading, notes, searchTerm, doneFilter]}>
        <If condition={isLoading}>
          <Then><Text>Loading</Text></Then>
          <Else>
            <Stack height="expand" width="expand" backgroundColor="#F1F3F5">
              <Positioned>
                {header}
                {body}
              </Positioned>
              <Positioned alignment="bottomEnd" margin={28}>
                <CircularButton
                  icon="plus"
                  onPress={navigator.present(EditNote, { state: { note: emptyNote() } })}
                />
              </Positioned>
            </Stack>
          </Else>
        </If>
      </Lifecycle>
    </ScreenComponent>
  )
}
