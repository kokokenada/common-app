/**
 * Created by kenono on 2016-04-16.
 */

import { MenuItem, MenuItemDefintion } from "./menu-item";

export class Menus {
  private _menus:MenuItem[] = [];
  private savedForLater = [];

  constructor() {
  }

  getMenus():MenuItem[] {
    return this._menus;
  }

  getMenuFromId(id:string, menus:MenuItem[]=this._menus):MenuItem {
    let item = menus.find( (menu:MenuItem) =>{
      return menu.id===id;
    });
    if (item) {
      return item;
    } else {
      for (let i =0; i<menus.length; i++) {
        let sub:MenuItem = menus[i];
        item = this.getMenuFromId(id, sub.items); // recurse
        if (item)
          return item;
      }
      return null;
    }
  }

  // Validate menu existance
   validateMenuExistance(menuId:string):MenuItem {
    if (menuId && menuId.length) {
      let menuItem:MenuItem = this.getMenuFromId(menuId);
      if (menuItem) {
        return menuItem;
      } else {
        console.error('Menu "' + menuId + '" does not exist');
      }
    } else {
      console.error('MenuId was not provided');
    }
    return null;
  };

  // Get the menu object by menu id
  getMenu = function (menuId:string):MenuItem {
    // Validate that the menu exists
    let menuItem:MenuItem = this.validateMenuExistance(menuId);

    // Return the menu object
    return menuItem;
  };

  // Add new menu object by menu id
  addMenu(options:MenuItemDefintion):MenuItem {
    // Create the new menu
    this._menus.push(new MenuItem(options));
    this.trySavedForLater();

    // Return the menu object
    return this.getMenuFromId(options.id);
  };

  // Remove existing menu object by menu id
  removeMenu(menuId:string):void {
    // Validate that the menu exists
    this.validateMenuExistance(menuId);

    // Return the menu object

    this.removeMenu(menuId);
  };

/*  // Add menu item object
  static addMenuItem(parentMenuId:string, options:MenuItemDefintion):MenuItem {
    options = options || {};

    console.log('addMenuItem')
    console.log(options)

    // Validate that the menu exists
    this.validateMenuExistance(parentMenuId);

    // Push new menu item
    this.getMenuFromId(parentMenuId).menu.items.push( new MenuItem(options));

    // Add submenu items
    if (options.items) {
      for (let i in options.items) {
        this.addSubMenuItem(parentMenuId + '_' +i, menuId, options.items[i]);
      }
    }

    // See if some orphans can be integrated
    this.trySavedForLater();

    // Return the menu object
    return this.getMenuFromId(menuId);
  };
*/
  private saveForLater(parentId:string, options:MenuItemDefintion):void {
    this.savedForLater.push({parentId: parentId, options: options});
  };

  // Add submenu item object
  addSubMenuItem(parentId:string, options:MenuItemDefintion):MenuItem {
    // Search for menu item
    let parent:MenuItem = this.getMenuFromId(parentId);
    if (parent) {
      parent.items.push(new MenuItem(options));
      this.trySavedForLater();
      let returnedMenuItem  = this.getMenuFromId(options.id);
      returnedMenuItem.parent = parent;
//      console.log('addSubMenuItem')
//      console.log(returnedMenuItem)
      return returnedMenuItem;
    } else {
//      console.log('saved for later')
      this.saveForLater(parentId, options);
      return null;
    }
  };

  private  trySavedForLater():void {
    let tryList = this.savedForLater;
    this.savedForLater = [];
    for (let i = 0; i < tryList.length; i++) {
      if (this.addSubMenuItem(tryList[i].parentId, tryList[i].options)) {
        tryList.splice(i,1);
      }
    }
  };

}
