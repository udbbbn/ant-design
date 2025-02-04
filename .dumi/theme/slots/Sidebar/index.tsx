import React, { type FC, useContext } from 'react';
import { useSidebarData } from 'dumi';
import { Affix, Col, Menu } from 'antd';
import MobileMenu from 'rc-drawer';
import SiteContext from '../SiteContext';
import useMenu from '../../../hooks/useMenu';
import useSiteToken from '../../../hooks/useSiteToken';
import { css } from '@emotion/react';

const useStyle = () => {
  const { token } = useSiteToken();

  const { antCls, fontFamily, colorSplit } = token;

  return {
    asideContainer: css`
      min-height: 100%;
      padding-bottom: 48px;
      font-family: Avenir, ${fontFamily}, sans-serif;

      &${antCls}-menu-inline {
        ${antCls}-menu-submenu-title h4,
        > ${antCls}-menu-item,
        ${antCls}-menu-item a {
          overflow: hidden;
          font-size: 14px;
          text-overflow: ellipsis;
        }

        > ${antCls}-menu-item-group > ${antCls}-menu-item-group-title {
          margin-top: 16px;
          margin-bottom: 16px;
          font-size: 13px;

          &::after {
            position: relative;
            top: 12px;
            display: block;
            width: calc(100% - 20px);
            height: 1px;
            background: ${colorSplit};
            content: '';
          }
        }

        > ${antCls}-menu-item,
          > ${antCls}-menu-submenu
          > ${antCls}-menu-submenu-title,
          > ${antCls}-menu-item-group
          > ${antCls}-menu-item-group-title,
          > ${antCls}-menu-item-group
          > ${antCls}-menu-item-group-list
          > ${antCls}-menu-item,
          &${antCls}-menu-inline
          > ${antCls}-menu-item-group
          > ${antCls}-menu-item-group-list
          > ${antCls}-menu-item {
          padding-left: 40px !important;

          ${antCls}-row-rtl & {
            padding-right: 40px !important;
            padding-left: 16px !important;
          }
        }

        // Nest Category > Type > Article
        &${antCls}-menu-inline {
          ${antCls}-menu-item-group-title {
            padding-left: 60px;
            margin-left: 4px;

            ${antCls}-row-rtl & {
              padding-right: 60px;
              padding-left: 16px;
            }
          }

          ${antCls}-menu-item-group-list > ${antCls}-menu-item {
            padding-left: 80px !important;

            ${antCls}-row-rtl & {
              padding-right: 80px !important;
              padding-left: 16px !important;
            }
          }
        }

        ${antCls}-menu-item-group:first-child {
          ${antCls}-menu-item-group-title {
            margin-top: 0;
          }
        }
      }

      a[disabled] {
        color: #ccc;
      }

      .chinese {
        margin-left: 6px;
        font-weight: normal;
        font-size: 12px;
        opacity: 0.67;
      }
    `,
    mainMenu: css`
      z-index: 1;

      .main-menu-inner {
        height: 100%;
        max-height: 100vh;
        overflow: hidden;
      }

      &:hover .main-menu-inner {
        overflow-y: auto;
      }

      > div,
      > div > div {
        height: 100%;
      }
    `,
  };
};

const Sidebar: FC = () => {
  const sidebarData = useSidebarData();
  const { isMobile } = useContext(SiteContext);
  const styles = useStyle();

  const [menuItems, selectedKey] = useMenu();

  const menuChild = (
    <Menu
      items={menuItems}
      inlineIndent={30}
      css={styles.asideContainer}
      mode="inline"
      selectedKeys={[selectedKey]}
      defaultOpenKeys={sidebarData?.map(({ title }) => title).filter((item) => item) as string[]}
    />
  );

  return isMobile ? (
    <MobileMenu key="Mobile-menu">{menuChild}</MobileMenu>
  ) : (
    <Col xxl={4} xl={5} lg={6} md={6} sm={24} xs={24} css={styles.mainMenu}>
      <Affix>
        <section style={{ width: '100%' }} className="main-menu-inner">
          {menuChild}
        </section>
      </Affix>
    </Col>
  );
};

export default Sidebar;
