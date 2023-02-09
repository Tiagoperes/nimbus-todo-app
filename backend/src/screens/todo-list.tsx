import { createState, NimbusJSX, If, Then, Else, ForEach } from '@zup-it/nimbus-backend-core'
import { sendRequest, log } from '@zup-it/nimbus-backend-core/actions'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Lifecycle, Text, Column } from '@zup-it/nimbus-backend-layout'
import { NoteSection } from '../types'

export const ToDoList: Screen = () => {
  const isLoading = createState('isLoading', true)
  const notes = createState<NoteSection[]>('notes', [])

  const loadItems = sendRequest<NoteSection[]>({
    url: "https://gist.githubusercontent.com/Tiagoperes/3888902b98494708202fa05569444451/raw/dbc705192e2f87233da2f1eec35936aef8125545/todo.json",
    onSuccess: response => notes.set(response.get('data')),
    onError: response => log({ level: 'error', message: response.get('message') }),
    onFinish: isLoading.set(false),
  })

  return (
    <Lifecycle onInit={loadItems} state={[isLoading, notes]}>
      <If condition={isLoading}>
        <Then><Text>Loading</Text></Then>
        <Else>
          <Column>
            <ForEach items={notes} key="date">
              {(section) => (
                <Column marginTop={5}>
                  <Text weight="bold">{section.get('date')}</Text>
                  <ForEach items={section.get('items')} key="id">
                    {(item) => <Text>{item.get('title')}</Text>}
                  </ForEach>
                </Column>
              )}
            </ForEach>
          </Column>
        </Else>
      </If>
    </Lifecycle>
  )
}

