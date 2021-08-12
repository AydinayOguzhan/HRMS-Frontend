import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import SignedIn from './SignedIn'
import SignedOut from './SignedOut'


export default function Navi() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    function handleSignOut() {
        setIsAuthenticated(false)
    }

    function handleSignIn() {
        setIsAuthenticated(true)
    }

    return (
        <div>
            <Menu inverted size= "large" >
                <Container>
                    <Menu.Item as={NavLink} to="/jobadvertisements" name='home'/>

                    <Menu.Item as={NavLink} to="/admin/verifyjobadvertisement">İlan onayla</Menu.Item>

                    <Menu.Item as={NavLink} to="/jobposition/add">İş pozisyonu ekle</Menu.Item>

                    <Menu.Item as={NavLink} to="/admin/approveemployerdataupdate">İş veren güncelleme onayla</Menu.Item>

                    <Menu.Menu position='right'>
                        {isAuthenticated?<SignedIn signOut={handleSignOut}/>:<SignedOut signIn={handleSignIn}/>}   
                    </Menu.Menu>
                </Container>
            </Menu>
        </div>
    )
}
