import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineArrowRight as Arrow } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'

import Logo from '../../assets/sky-news-3.svg'
import { useAuth } from '../../context/AuthContext'
import NewsModel from '../../models/newsData'
import { getAllNews } from '../../services/news'
import { dashboard, personalization } from './data/menus'
import { LogoContainer, LogoutButton, Menus, SideBarContainer } from './style'

const SideBar: React.FC = () => {
  const [news, setNews] = useState<NewsModel>()
  const { logout } = useAuth()
  const location = useLocation()

  const [menuChildrenToBeShown, setMenuChildrenToBeShown] = useState<number[]>(
    []
  )

  const showOrHideMenuChildren = (index: number) => {
    if (menuChildrenToBeShown.includes(index)) {
      const indexOfMenu = menuChildrenToBeShown.indexOf(index)
      if (indexOfMenu > -1 && indexOfMenu < menuChildrenToBeShown.length) {
        menuChildrenToBeShown.splice(indexOfMenu, 1)
      }
    } else {
      menuChildrenToBeShown.push(index)
    }

    setMenuChildrenToBeShown([...menuChildrenToBeShown])
  }

  const checkShouldShowMenuChildren = useCallback(
    (index: number) => {
      return menuChildrenToBeShown.includes(index)
    },
    [menuChildrenToBeShown]
  )

  return (
    <SideBarContainer>
      <Menus>
        <div>
          <LogoContainer>
            <img src={Logo} alt="logo" />
          </LogoContainer>
          <div className="options">
            {dashboard.path ? (
              <Link
                className={location.pathname === dashboard.path ? 'active' : ''}
                key={dashboard.path}
                to={dashboard.path}
              >
                {dashboard.label}
              </Link>
            ) : (
              <></>
            )}
          </div>

          <hr />
          <h2>Personalização</h2>
          <div className="options">
            {personalization && personalization.length ? (
              personalization.map((menu: any, index) =>
                menu.children && menu.children.length ? (
                  <div key={index}>
                    <button onClick={() => showOrHideMenuChildren(index)}>
                      {menu.label}
                      <span
                        className={`sub-items ${
                          menuChildrenToBeShown.includes(index) ? 'active' : ''
                        }`}
                      >
                        <Arrow />
                      </span>
                    </button>
                    <div style={{ marginLeft: '25px' }}>
                      {checkShouldShowMenuChildren(index) ? (
                        menu.children.map((child) => (
                          <Link
                            className={
                              location.pathname === child.path ? 'active' : ''
                            }
                            key={child.path}
                            to={child.path}
                          >
                            {child.label}
                          </Link>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ) : menu.path ? (
                  <Link
                    className={location.pathname === menu.path ? 'active' : ''}
                    key={menu.path}
                    to={menu.path}
                  >
                    {menu.label}
                  </Link>
                ) : (
                  <></>
                )
              )
            ) : (
              <></>
            )}
          </div>

          <hr />
        </div>

        <LogoutButton onClick={logout}>
          <span className="icon">
            <BiLogOut />
          </span>

          <span className="text">Sair da conta</span>
        </LogoutButton>

      </Menus>
    </SideBarContainer>
  )
}

export default SideBar
