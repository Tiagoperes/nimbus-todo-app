import { createState, NimbusJSX, If, Then, Else, ForEach, State, contains, lowercase, or, eq, not, and } from '@zup-it/nimbus-backend-core'
import { sendRequest, log } from '@zup-it/nimbus-backend-core/actions'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Lifecycle, Text, Column, Row, ScreenComponent, ScrollView } from '@zup-it/nimbus-backend-layout'
import { NoteCard } from '../fragments/NoteCard'
import { Icon } from '../components/Icon'
import { SelectionGroup } from '../components/SelectionGroup'
import { TextInput } from '../components/TextInput'
import { Note, NoteSection } from '../types'
import { Separator } from '../fragments/Separator'
import { formatDate } from '../operations/format-date'
import { EditNote } from '../screens/edit-note'

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

export const ToDoList: Screen = ({ navigator }) => {
  const searchTerm = createState('searchTerm', '')
  const doneFilter = createState<'All' | 'To do' | 'Done'>('doneFilter', 'All')
  const isLoading = createState('isLoading', true)
  const notes = createState<NoteSection[]>('notes', [])

  const loadItems = sendRequest<NoteSection[]>({
    url: "https://gist.githubusercontent.com/Tiagoperes/3888902b98494708202fa05569444451/raw/dbc705192e2f87233da2f1eec35936aef8125545/todo.json",
    onSuccess: response => notes.set(response.get('data')),
    onError: response => log({ level: 'error', message: response.get('message') }),
    onFinish: isLoading.set(false),
  })

  const header = (
    <Row backgroundColor="#5F72C0" crossAxisAlignment="center" paddingHorizontal={20} height={65}>
      <Icon name="search" color="#FFFFFF" size={28} />
      <Row width="expand">
        <TextInput color="#FFFFFF" label="Search" value={searchTerm} onChange={value => searchTerm.set(value)} />
      </Row>
      <SelectionGroup options={["All", "To do", "Done"]} value={doneFilter} onChange={value => doneFilter.set(value)} />
    </Row>
  )

  return (
    <ScreenComponent safeAreaTopBackground="#5F72C0" statusBarColorScheme="dark">
      <Lifecycle onInit={loadItems} state={[isLoading, notes, searchTerm, doneFilter]}>
        <If condition={isLoading}>
          <Then><Text>Loading</Text></Then>
          <Else>
            <Column height="expand" width="expand" backgroundColor="#F1F3F5">
              {header}
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
            </Column>
          </Else>
        </If>
      </Lifecycle>
    </ScreenComponent>
  )
}
