import { NimbusJSX, FC, State, condition, not, If, Then, isEmpty, Actions } from '@zup-it/nimbus-backend-core'
import { Column, Row, Text, Touchable } from '@zup-it/nimbus-backend-layout'
import { Icon } from '../components/Icon'
import { Note } from '../types'

interface Props {
  value: State<Note>,
  onShowEditModal: Actions,
  onRemove: Actions,
  onToggleDoneStatus: Actions,
}

export const NoteCard: FC<Props> = ({ value, onShowEditModal, onRemove, onToggleDoneStatus }) => (
  <Row crossAxisAlignment="center" paddingVertical={12} paddingHorizontal={20} backgroundColor="#FFFFFF" minHeight={60}>
    <Touchable onPress={onToggleDoneStatus}>
      <Column
        borderColor={condition(value.get('isDone'), '#5F7260', '#E0E4E9')}
        backgroundColor={condition(value.get('isDone'), '#CDD3EB', '#FFFFFF')}
        borderWidth={2}
        cornerRadius={14}
        width={22}
        height={22}
      />
    </Touchable>
    <Column marginHorizontal={20} width="expand">
      <Touchable onPress={onShowEditModal}>
        <Text weight="bold" color="#616B76">{value.get('title')}</Text>
        <If condition={not(isEmpty(value.get('description')))}>
          <Then>
            <Column marginTop={8}><Text color="#85919C">{value.get('description')}</Text></Column>
          </Then>
        </If>
      </Touchable>
    </Column>
    <Touchable onPress={onRemove}>
      <Icon name="delete" size={20} color="#F00000" />
    </Touchable>
  </Row>
)
