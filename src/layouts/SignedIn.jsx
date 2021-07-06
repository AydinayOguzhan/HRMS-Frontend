import React from 'react'
import { NavLink } from 'react-router-dom'
import { Dropdown, Menu,Image } from 'semantic-ui-react'

export default function SignedIn({signOut}) {
    return (
        <div>
            <Menu.Item>
                {/* TODO: Fotoğrafı userImageController dan al */}
                <Image avatar spaced="right" src="https://pbs.twimg.com/profile_images/1280736129298370560/lpDLJp3B.jpg"/>
                <Dropdown pointing="top left" text="Oğuzhan">
                    <Dropdown.Menu>
                        <Dropdown.Item as={NavLink} to="/usercv" text="Bilgilerim" icon="info"></Dropdown.Item>
                        <Dropdown.Item onClick={signOut} text="Çıkış Yap" icon="sign-out"></Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/jobadvertisement/add" text="İş ilanı ekle" icon="add circle"></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
