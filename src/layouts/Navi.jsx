import React from 'react'
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react'

export default function () {
    return (
        <div>
            <Menu inverted size='medium' >
                <Container>
                    <Menu.Item
                        name='home'
                    />

                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button primary>Sign Up</Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Button>Login</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        </div>
    )
}
