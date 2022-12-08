import {FiShoppingBag} from 'react-icons/fi'
import {VscGitPullRequestCreate} from 'react-icons/vsc'
import {GiRamProfile} from 'react-icons/gi'
import {MdFavoriteBorder} from 'react-icons/md'
import {BiCollection} from 'react-icons/bi'

export const linkList:Array<any> = [
    {
        title: "Pages",
        links: [
            {
                name: "ecommerce",
                icon: <FiShoppingBag style={{ fontSize: '18' }}/>
            },
            {
                name: "Create",
                icon: <VscGitPullRequestCreate style={{ fontSize: '18' }}/>
            }
        ],
    },
]

export const linkNavbar:Array<any> = [
    {
        name: "Profile",
        icon: <GiRamProfile className='dropdown-item-icon' />,
        link: "Profile"
    },
    {
        name: "Favorites",
        icon: <MdFavoriteBorder className='dropdown-item-icon' />,
        link: "Favorites"
    },
    {
        name: "Create",
        icon: <GiRamProfile className='dropdown-item-icon' />,
        link: "Create"
    },
    {
        name: "My Collection",
        icon: <BiCollection className='dropdown-item-icon' />,
        link: "my-collection"
    },
]