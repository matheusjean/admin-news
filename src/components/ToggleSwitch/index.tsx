import { useState } from 'react'
import Switch from 'react-switch'

import Label from '../Label'
import * as S from './style'

interface toggleSwitchProps {
  label: string
  setToggleState?: any
  isActive?: boolean
}
export default function ToggleSwitch({
  label,
  setToggleState,
  isActive
}: toggleSwitchProps) {
  function handleSwitch() {
    setToggleState(!isActive)
  }
  return (
    <S.Container>
      <Label>{label}</Label>
      <S.Toggle isChecked={isActive}>
        <Switch
          onChange={handleSwitch}
          checked={isActive}
          offColor="#1c1c1c"
          onColor="#1c1c1c"
          borderRadius={20}
          activeBoxShadow="none"
          offHandleColor="#fff"
          onHandleColor="#E4672E"
          checkedIcon={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                background: 'transparent',
                fontSize: 12,
                color: '#E4672E',
                paddingRight: 2
              }}
            >
              Sim
            </div>
          }
          uncheckedIcon={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                background: 'transparent',
                fontSize: 12,
                color: 'white',
                paddingRight: 2
              }}
            >
              Não
            </div>
          }
        />
      </S.Toggle>
    </S.Container>
  )
}
