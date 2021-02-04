using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Webet333.models.Response.Account;

namespace Webet333.models.Mapping.Permissions
{
    public class PermissionsMapping
    {
        public ICollection<MenusResponse> Map(ICollection<MenusResponse> menuList, ICollection<MenusResponse> defaultMenuList)
        {
            var response = new Collection<MenusResponse>();

            foreach (var menu in defaultMenuList)
            {
                var selectedMenu = menuList.FirstOrDefault(x => x.Text.Equals(menu.Text));

                if (selectedMenu != null)
                {
                    response.Add(new MenusResponse
                    {
                        Id = selectedMenu.Id,
                        IsChecked = selectedMenu.IsChecked,
                        Text = selectedMenu.Text,
                        Priority = selectedMenu.Priority,
                        Icon = selectedMenu.Icon,
                        IsActive = selectedMenu.IsActive,
                        Link = selectedMenu.Link,
                        Permissions = Map(selectedMenu.Permissions, menu.Permissions),
                        Submenu = selectedMenu.Submenu
                    });
                }
                else
                    response.Add(menu);
            }

            return response.OrderBy(x => x.Priority).ToList();
        }

        private ICollection<Permission> Map(ICollection<Permission> permissionList, ICollection<Permission> defaultpermissionList)
        {
            var response = new Collection<Permission>();

            foreach (var menu in defaultpermissionList)
            {
                var selectedMenu = permissionList.FirstOrDefault(x => x.Text.Equals(menu.Text));

                if (selectedMenu != null)
                {
                    response.Add(new Permission
                    {
                        Id = selectedMenu.Id,
                        IsChecked = selectedMenu.IsChecked,
                        Text = selectedMenu.Text,
                        IsShow = selectedMenu.IsShow,
                        IsDisabled = selectedMenu.IsDisabled
                    });
                }
                else
                    response.Add(menu);
            }

            return response;
        }
    }
}