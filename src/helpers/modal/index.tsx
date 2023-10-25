import React from 'react'
import ReactDOM from "react-dom/client";
import { GrFormClose } from 'react-icons/gr'

import { ThemeProvider } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import theme from '../../styles/theme'
import {
  ModalCloseButton,
  ModalContent,
  ModalContentContainer,
  ModalHeader,
  ModalTitle
} from './style'

type Props = {
  title: string
  content: React.ReactElement
  styleModal?: 'default' | 'large'
}

const showModal = ({ title, content, styleModal }: Props) => {
  const modalId = `global-modal_${uuidv4()}`

  const modal = document.createElement('div')
  modal.id = modalId

  document.body.appendChild(modal)

  const contentToShow = React.cloneElement(content, {
    modalId,
    ...content.props
  })

  const root = ReactDOM.createRoot(document.getElementById(modalId) as HTMLElement);

  root.render(
    <ThemeProvider theme={theme}>
      <ModalContentContainer styleModal={styleModal}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalCloseButton type="button" onClick={() => hideModal(modalId)}>
            <GrFormClose size={25} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalContent>{contentToShow}</ModalContent>
      </ModalContentContainer>
    </ThemeProvider>,
  )
  return modalId
}

const hideModal = (modalId?: string) => {
  let modal = null as HTMLElement | null
  if (modalId) {
    modal = document.getElementById(`${modalId}`)
  } else {
    modal = document.querySelector(`[id^='global-modal']`)
  }

  if (modal) {
    modal.remove()
  }
}

export { showModal, hideModal }
