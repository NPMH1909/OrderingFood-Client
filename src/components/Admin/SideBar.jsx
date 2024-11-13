import {
  Card,
  Typography,
} from "@material-tailwind/react";

export function SideBar({ sidebarData, setActiveComponent, activeIndex, setActiveIndex }) {
  return (
      <Card className="h-[calc(100vh-4rem)] max-w-[20rem] pl-2 rounded-none shadow-xl shadow-blue-gray-900/5">
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
                  <div>
                      {section.sublist.map((item, idx) => (
                          <div
                              key={idx}
                              onClick={() => {
                                  setActiveComponent(item.elements);
                                  setActiveIndex(idx); // Cập nhật chỉ số active
                              }}
                              className={`cursor-pointer p-2 rounded transition-colors duration-200 ${
                                  activeIndex === idx ? 'bg-blue-500 text-white' : 'text-black hover:bg-blue-100'
                              }`}
                          >
                              {item.label}
                          </div>
                      ))}
                  </div>
              </div>
          ))}
      </Card>
  );
}
