import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from '@mui/icons-material/Message';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

export const navData = [
    {
        id: 0,
        icon: <HomeIcon />,
        text: "Home",
        link: "/Home"
    },
    {
        id: 1,
        icon: <SearchIcon />,
        text: "Search",
        link: "/songSearch"
    },
    {
        id: 2,
        icon: <LibraryMusicIcon />,
        text: "My Playlist",
        link: "/Myplyst"
    },
    {
        id: 3,
        icon: <MessageIcon />,
        text: "Messages",
        link: "/messages"
    },
    {
        id: 4,
        icon: <AutoAwesomeIcon />,
        text: "Generate Playlist",
        link: "/GenPlyst"
    },
    {
        id: 5,
        icon: <LogoutIcon  />,
        text: "Sign Out",
        link: "/SignOut"
    },
];
