import React from 'react'
import { useState, useEffect } from 'react'
import UserCvsService from '../services/userCvsService'
import LanguagesService from '../services/languagesService'
import ProgrammingLanguagesService from '../services/programmingLanguagesService'
import JobSeekersService from '../services/jobSeekersService'
import { Card, Table, Image, Button, Grid, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default function UserCv() {
    var dateFormat = require("dateformat");
    const userId = 31

    const [userCv, setUserCv] = useState({})
    const [userSchools, setUserSchools] = useState([])
    const [userLanguages, setUserLanguages] = useState([])
    const [userLinks, setUserLinks] = useState([])
    const [userJobExperiences, setUserJobExperiences] = useState([])
    const [userProgrammingLanguages, setUserProgrammingLanguages] = useState([])
    const [languages, setLanguages] = useState([])
    const [programmingLanguages, setProgrammingLanguages] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        const userCvsService = new UserCvsService()
        const languagesService = new LanguagesService()
        const programmingLanguagesService = new ProgrammingLanguagesService()
        const jobSeekersService = new JobSeekersService()
        jobSeekersService.getByUserId(userId).then((result) => { setUser(result.data.data) })
        userCvsService.getUserCv(userId).then((result) => {
            setUserCv(result.data.data); setUserSchools(result.data.data.userSchools); setUserLanguages(result.data.data.userLanguages);
            setUserLinks(result.data.data.userLinks); setUserJobExperiences(result.data.data.userJobExperiences);
            setUserProgrammingLanguages(result.data.data.userProgrammingLanguage)
        })
        languagesService.getAll().then((result) => { setLanguages(result.data.data) })
        programmingLanguagesService.getAll().then((result) => { setProgrammingLanguages(result.data.data) })
    }, [])
    // console.log(user)
    return (
        <div>
            <br />
            <Card.Group>
                <Card color="blue">
                    <Image src={userCv.userImage} />
                    <Card.Content>
                        <Card.Header>{user.firstName} {user.lastName}</Card.Header>
                        <Card.Meta>{user.dateOfBirth}</Card.Meta>
                    </Card.Content>
                    <Button color="blue"
                        as={NavLink} to={{ pathname: "/usercv/adduserinformations", state: { userId: userId } }}
                    >Bilgileri Değiştir</Button>
                </Card>

                <Card fluid color="blue">
                    <Card.Content>
                        <Card.Header>
                            <Grid columns={3}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Button floated="left" size="small" inverted color="blue"
                                            as={NavLink} to={{ pathname: "/usercv/addusercoverletter", state: { userId: userId } }}
                                        ><Icon name='add' /> Ön Yazı Ekle/Güncelle</Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        Ön yazı
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Card.Description>{userCv.userCoverLetter}</Card.Description>
                    </Card.Content>
                    <Card.Content></Card.Content>
                </Card>

                <Card fluid color="blue">
                    <Card.Content>
                        <Card.Header>
                            <Grid columns={3}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Button floated="left" size="small" inverted color="blue"
                                            as={NavLink} to={{ pathname: "/usercv/adduserjobexperiences", state: { userId: userId } }}
                                        ><Icon name='add' /> Tecrübe Ekle/Güncelle</Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        İş Tecrübeleri
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card.Header>
                        <Table singleLine color="blue">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                                    <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                                    <Table.HeaderCell>Başlama tarihi</Table.HeaderCell>
                                    <Table.HeaderCell>Çıkış tarihi</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    userJobExperiences.map(job => (
                                        <Table.Row key={job.id}>
                                            <Table.Cell>{job.companyName}</Table.Cell>
                                            <Table.Cell>{job.position}</Table.Cell>
                                            <Table.Cell>{dateFormat(job.startDate, "dd/mm/yyyy")}</Table.Cell>
                                            <Table.Cell>{dateFormat(job.quitDate, "dd/mm/yyyy")}</Table.Cell>
                                        </Table.Row>
                                    ))
                                }
                            </Table.Body>
                        </Table>
                    </Card.Content>
                </Card>

                <Card fluid color="blue">
                    <Card.Content>
                        <Card.Header>
                            <Grid columns={3}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Button floated="left" size="small" inverted color="blue"
                                            as={NavLink} to={{ pathname: "/usercv/adduserprogramminglanguages", state: { userId: userId } }}
                                        ><Icon name='add' /> Teknoloji Ekle/Güncelle</Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        Kullandığı Teknolojiler
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card.Header>
                        <Table singleLine color="blue">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Teknoloji</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    userProgrammingLanguages.map(userProgrammingLanguage => (
                                        <Table.Row key={userProgrammingLanguage.id}>
                                            {
                                                <Table.Cell>{
                                                    programmingLanguages.map((item) => {
                                                        if (item.id === userProgrammingLanguage.programmingLanguageId) {
                                                            return item.language
                                                        }
                                                    })
                                                }</Table.Cell>
                                            }
                                        </Table.Row>
                                    ))
                                }
                            </Table.Body>
                        </Table>
                    </Card.Content>
                </Card>


                <Card fluid color="blue">
                    <Card.Content>
                        <Card.Header>
                            <Grid columns={3}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Button floated="left" size="small" inverted color="blue"
                                            as={NavLink} to={{ pathname: "/usercv/adduserschools", state: { userId: userId } }}
                                        ><Icon name='add' /> Okul Ekle/Güncelle</Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        Okuduğu Okullar
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                        </Card.Header>
                        <Table singleLine color="blue">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Okul</Table.HeaderCell>
                                    <Table.HeaderCell>Bölüm</Table.HeaderCell>
                                    <Table.HeaderCell>Başlama tarihi</Table.HeaderCell>
                                    <Table.HeaderCell>Bitirme tarihi</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    userSchools.map(school => (
                                        <Table.Row key={school.id}>
                                            <Table.Cell>{school.schoolName}</Table.Cell>
                                            <Table.Cell>{school.department}</Table.Cell>
                                            <Table.Cell>{dateFormat(school.startDate, "dd/mm/yyyy")}</Table.Cell>
                                            <Table.Cell>{!school.graduateDate ? null : dateFormat(school.graduateDate, "dd/mm/yyyy")}</Table.Cell>
                                        </Table.Row>
                                    ))
                                }
                            </Table.Body>
                        </Table>
                    </Card.Content>
                </Card>

                <Card fluid color="blue">
                    <Card.Content>
                        <Card.Header>
                            <Grid columns={3}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Button floated="left" size="small" inverted color="blue"
                                            as={NavLink} to={{ pathname: "/usercv/adduserlanguages", state: { userId: userId } }}
                                        ><Icon name='add' /> Dil Ekle/Güncelle</Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        Bildiği Diller
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card.Header>
                        <Table singleLine color="blue">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Dil</Table.HeaderCell>
                                    <Table.HeaderCell>Seviye</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    userLanguages.map(language => (
                                        <Table.Row key={language.id}>
                                            <Table.Cell>{
                                                languages.map((item) => {
                                                    if (item.id === language.languageId) {
                                                        return item.name
                                                    }
                                                })
                                            }</Table.Cell>
                                            <Table.Cell>{language.level}</Table.Cell>
                                        </Table.Row>
                                    ))
                                }
                            </Table.Body>
                        </Table>
                    </Card.Content>
                </Card>

                <Card fluid color="blue">
                    <Card.Content>
                        <Card.Header>
                            <Grid columns={3}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Button floated="left" size="small" inverted color="blue"
                                            as={NavLink} to={{ pathname: "/usercv/adduserlinks", state: { userId: userId } }}
                                        ><Icon name='add' /> Link Ekle/Güncelle</Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        Linkler
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card.Header>
                        <Table singleLine color="blue">
                            <Table.Body>
                                {
                                    userLinks.map(link => (
                                        <Table.Row key={link.id}>
                                            <Table.Cell>{link.link}</Table.Cell>
                                        </Table.Row>
                                    ))
                                }
                            </Table.Body>
                        </Table>
                    </Card.Content>
                </Card>
            </Card.Group>
            <br />
        </div>
    )
}
