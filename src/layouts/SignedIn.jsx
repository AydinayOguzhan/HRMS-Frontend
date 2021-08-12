import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { Dropdown, Menu,Image } from 'semantic-ui-react'
import ImageUploadService from '../services/imageUploadService'

export default function SignedIn({signOut}) {
    const [userImage, setUserImage] = useState()
    const userId = 31

    useEffect(() => {
        const imageUploadService = new ImageUploadService()
        imageUploadService.getByUserId(userId).then((response) => {setUserImage(response.data.data)})
    }, [userImage])

    return (
        <div>
            <Menu.Item>
                <Image avatar spaced="right" src={userImage}/>
                <Dropdown pointing="top left" text="Oğuzhan">
                    <Dropdown.Menu>
                        <Dropdown.Item as={NavLink} to="/usercv" text="Bilgilerim" icon="info"></Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/admin/hrmsinformation" text="Personel Bilgileri" icon="info"></Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/employerinformations" text="İş veren bilgileri" icon="info"></Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/jobadvertisement/add" text="İş ilanı ekle" icon="add circle"></Dropdown.Item>
                        <Dropdown.Item onClick={signOut} text="Çıkış Yap" icon="sign-out"></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
