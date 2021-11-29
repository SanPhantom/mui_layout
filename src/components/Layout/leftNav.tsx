import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import * as React from 'react';
import menus, { MenuProp } from '../../config/menu.config'
import { useNavigate } from 'react-router-dom'

export interface LeftNavProps {
  // props
}

const LeftNav: React.SFC<LeftNavProps> = props => {
  // const { props } = props;

  const [open, setOpen] = React.useState<{[x: string]: boolean}>({});
  const navigate = useNavigate()

  const handleExpandMenu = (menu: MenuProp) => {
    if (menu.children && menu.children.length) {
      let opens = open;
      for (const key in opens) {
        if (Object.prototype.hasOwnProperty.call(opens, key)) {
          if (key === menu.name) {
            opens[key] = !opens[key];
          } else {
            opens[key] = false;
          }
        }
      }
      setOpen({
        ...opens,
      });
    } else {
      navigate(menu.path)
    }
    
  }

  React.useEffect(() => {
    if (Array.isArray(menus)) {
      let opens: { [x: string]: boolean; } = {};
      menus.filter(d => d.children && d.children.length).map((menu) => {
        opens[menu.name] = false;
        return menu;
      })
      setOpen(opens);
    }
  }, [])

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader">
      {menus.map((menu, index) => (
        <>
          <ListItem key={'' + index} onClick={() => handleExpandMenu(menu)}>
            <ListItemText>{menu.name}</ListItemText>
            {menu.children && menu.children.length ? open[menu.name] ? <ExpandLess /> : <ExpandMore /> : null}
          </ListItem>
          {
            menu.children && menu.children.length ?
              <Collapse in={open[menu.name]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {
                    menu.children.map((sub, i) => (
                      <ListItem sx={{ pl: 4 }} key={'' + index + i} onClick={() => handleExpandMenu(sub)}>
                        <ListItemText primary={sub.name} />
                      </ListItem>
                    ))
                  }

                </List>
              </Collapse>
            : <></>
          }
        </>
      ))}
    </List>
  );
}

export default LeftNav;