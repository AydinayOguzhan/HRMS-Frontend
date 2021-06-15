import React from 'react'
import { Button, Menu } from 'semantic-ui-react'

export default function SignedOut({signIn}) {
    return (
        <div>
            <Menu.Item>
                <Button onClick={signIn} primary>Kayıt ol</Button>
                <Button onClick={signIn} style={{marginLeft:'0.5em'}}>Giriş yap</Button>
            </Menu.Item>
            
        </div>
    )
}
