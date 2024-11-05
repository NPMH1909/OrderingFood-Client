import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
  
  export function SideBar({ sidebarData, setActiveComponent }) {
    return (
      <Card className="h-[calc(100vh-4rem)] max-w-[20rem] rounded-none shadow-xl shadow-blue-gray-900/5">
        {sidebarData.map((section, index) => (
          <div key={index}>
            {section.title && (
              <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray" className="flex items-center">
                  {section.title.icon}
                  <span className="ml-2">{section.title.label}</span>
                </Typography>
              </div>
            )}
            <List>
              {section.sublist.map((item, idx) => (
                <ListItem key={idx} onClick={() => setActiveComponent(item.elements)}>
                  <ListItemPrefix>{item.label}</ListItemPrefix>
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </Card>
    );
  }
  