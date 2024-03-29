import styled from "styled-components";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect, useState } from "react";
import privateRequest, { publicRequest } from "../api/axios";
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import PaidIcon from '@mui/icons-material/Paid';
import { useDispatch } from 'react-redux';
import { resetLoading, setLoading } from "../redux/loadingSlice";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BasicTooltip from "./ToolTip";


const Container = styled.div`
    background-color: #e8eaf6;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    margin: 0px 10px 20px 10px;
    ${mobile({width: '84vw', margin: '0px', padding: 0})}
`

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
    gap: 2vw;
    ${mobile({flexDirection: 'column', alignItem: 'center', justifyContent: 'center', gap: '1vh'})}
`

const WidgetTitle = styled.h3`
    font-size: 14px;
    letter-spacing: 1px;
    text-align: center;
    color: ${props => props.titleColor};
    ${mobile({fontSize: '12px', color: '#fff' })}
`


const Widget = styled(Link)`
    flex: 1;
    display: flex; 
    flex-direction: row; 
    padding: 3vh 0;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
    -webkit-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
    -moz-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
    background-color: #fff;
    background-image: linear-gradient(${props => props.bgcolor} 0 0);
    background-size: 100% .35rem;
    background-position: 100% 100%;
    background-repeat: no-repeat;
    transition: background-size .3s;
    height: 100%;
    width: 100%;

    text-decoration: none;
    gap: 5px;
    color: #636363;

    &:hover {
        transition: background-size .3s;
        background-size: 100% 100%;
        color: #fff;
    }

    &:hover {
        .WidgetTitle {
        color: #fff;
        }
        .PercentageNumber {
        color: #fff;
        }
    } 

    &:visited {
        color: #636363;
    }



    ${mobile({display: 'flex', flexDirection: 'row', width: '70vw', height: '40vh', justifyContent: 'center', alignItem: 'center', gap: '5px',
        backgroundSize: '100% 100%', margin: '10px 15px', padding: '20px 10px'})}

`


const WidgetNumbers = styled.div`
    margin: 10px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    ${mobile({padding: '0px', margin: '0px 0px', color: '#fff', display: 'flex'})}
`

const WidgetMoney = styled.div`
    font-size: 20px;
    font-weight: 700;
    ${mobile({fontSize: '18px'})}
`

const WidgetMoneyMain = styled.div`
    font-size: 24px;
    font-weight: 800;
    ${mobile({fontSize: '20px'})}
`

const WidgetRate = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    font-size: 16px;
    font-weight: 400;
    ${mobile({marginLeft: '5px', color: '#fff'})}
`

const Icon = styled.div`
    font-size: 2px;
    margin-left: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({marginLeft: '0px'})}
    color: ${props => props.percentage ? 'rgba(26, 167, 145, 0.671)' : '#e53935'};
`

const WidgetSubtitle = styled.h4`
    font-size: 12px;
`

const WidgetIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.iconBgColor};
    width: 45px;
    height: 45px;
    border-radius: 50%;
    color: ${props => props.iconColor};

    ${mobile({width: '35px', height: '35px', marginLeft: '5px'})}
`

const MainWidget = styled.div`
    flex: 1;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
    -webkit-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
    -moz-box-shadow: 0px 0px 10px 2px rgba(161,161,161,0.61);
    background-image: linear-gradient(to right top, #00acc1, #38b8cb, #54c5d5, #6bd1df, #80deea);
    height: max-content;
    color: #e0f7fa;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    ${mobile({width: '60vw', height: '30vh', margin: '10px 15px', padding: '28px'})}

`

const Center = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 3vh;
    ${mobile({gap: '1vh'})}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 3vh;
    ${mobile({gap: '1vh'})}
`

const MainWidgetIcon = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 50px;
`

const Mobile = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    align-items: center;
    justify-content: center;
    gap: 10px;
    ${mobile({display: 'flex', flexDirection: 'column', flex: '2',  alignItems: 'center', justifyContent: 'center', gap: '10px'})}
`

const Top = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2vh;

    ${mobile({gap: '10px'})}
`

const Number = styled.div`
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    ${mobile({display: 'flex',  alignItems: 'center', justifyContent: 'center'})}
`

const PercentageNumber = styled.div`
    text-decoration: none;
    color: ${props => props.percentage ? 'rgba(26, 167, 145, 0.671)' : '#e53935'};
    font-size: 18px;
    font-weight: 500;
    
`

const PercentageNumber2 = styled.div`
    text-decoration: none;
    color: ${props => props.percentage ? 'rgba(26, 167, 145, 0.671)' : '#e53935'};
    font-size: 16px;
    font-weight: 500;
    ${mobile({color: '#fff !important'})}
`

const TooltipIcon = styled.div`
    color: #b0bec5;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    
    ${mobile({color: '#fff'})}
`



const PanelStats = () => {

    
    const dispatch = useDispatch();

    const [income, setIncome] = useState([]);
    const [todayIncome, setTodayIncome] = useState([]);
    const [previousIncome, setPreviousIncome] = useState([]);
    const [actualIncome, setActualIncome] = useState([]);
    const [cashIncome, setCashIncome] = useState([]);
    const [cardIncome, setCardIncome] = useState([]);
    const [userStats, setUserStats] = useState(0);
    const [newUsersStats, setNewUsersStats] = useState(0);
    
    useEffect(() => {
        const getIncome = async () => {
            try {
                dispatch(setLoading())
                const res = await privateRequest.get("/orders/income")
                setIncome(res.data.lastMonthIncome[0]?.total)
                setPreviousIncome(res.data.previosuMonthIncome[0]?.total)
                dispatch(resetLoading())
            } catch (err) {
                console.log(err)
                dispatch(resetLoading())
            }
        }
        getIncome()
    }, [dispatch])

    useEffect(() => {
        const getActualIncome = async () => {
            try {
                const res = await privateRequest.get("/orders/actualincome")
                setActualIncome(res.data[0]?.total)
            } catch (err) {
                console.log(err)
            }
        }
        getActualIncome()
    }, [])

    useEffect(() => {
        const getTodayIncome = async () => {
            try {
                const res = await privateRequest.get("/orders/todayincome")
                setTodayIncome(res.data[0]?.total)
            } catch (err) {
                console.log(err)
            }
        }
        getTodayIncome()
    }, [])
    
    useEffect(() => {
        const getCashIncome = async () => {
            try {
                const res = await privateRequest.get("/orders/cash")
                setCashIncome(res.data[0]?.total)
            } catch (err) {
                console.log(err)
            }
        }
        getCashIncome()
    }, [])

    useEffect(() => {
        const getCardIncome = async () => {
            try {
                const res = await privateRequest.get("/orders/online")
                setCardIncome(res.data[0]?.total)
            } catch (err) {
                console.log(err)
            }
        }
        getCardIncome()
    }, [])

    useEffect(() => {
        const getUsersStats = async () => {
            try {
                const res = await privateRequest.get("/users/stats")
                setUserStats(res.data.usersQuantity)
                setNewUsersStats(res.data.newUsers)
            } catch (err) {
                console.log(err)
            }
        }
        getUsersStats()
    }, [])
    
  return (
    <Container>
        <Wrapper>
            <MainWidget >
                <WidgetTitle style={{color: '#fff', fontSize: '18x', fontWeight: '600'}}>Ventas</WidgetTitle>
                <WidgetNumbers>
                    <WidgetMoneyMain >$ {actualIncome ? new Intl.NumberFormat().format(actualIncome) : 0}</WidgetMoneyMain>
                    <WidgetRate style={{color: 'rgba(101, 255, 70, 0.945)'}}>
                        + $ {todayIncome ? new Intl.NumberFormat().format(todayIncome) : 0}
                    </WidgetRate>
                </WidgetNumbers>
                <WidgetNumbers>
                    <WidgetMoneyMain>USD {actualIncome ? new Intl.NumberFormat().format(actualIncome) : 0}</WidgetMoneyMain>
                    <WidgetRate style={{color: 'rgba(101, 255, 70, 0.945)'}}>
                        + USD {todayIncome ? new Intl.NumberFormat().format(todayIncome) : 0}
                    </WidgetRate>
                </WidgetNumbers>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <WidgetSubtitle>Ventas del mes en curso</WidgetSubtitle>
                    <BasicTooltip child={<TooltipIcon style={{ color: '#fff'}}><HelpOutlineIcon style={{fontSize: '20px', color: "inherit", marginLeft: '5px' }} /></TooltipIcon>} title={'Ventas del mes en curso e incremento diario'} />
                </div>
                <MainWidgetIcon>
                    <PaidIcon style={{fontSize: 'inherit'}}/>
                </MainWidgetIcon>
            </MainWidget>
            <Center>
                <Widget bgcolor="#03a9f4" to='/users' >
                    <Top>
                        <WidgetIcon iconBgColor="#b3e5fc" iconColor="#03a9f4">
                            <PeopleAltRoundedIcon />
                        </WidgetIcon>
                        <WidgetRate style={{marginRight: '15px', color: 'rgba(26, 167, 145, 0.671)'}}>
                            <Number className='WidgetTitle'>+ {newUsersStats ? newUsersStats : 0}</Number>
                        </WidgetRate>
                    </Top>
                    <Mobile>
                    <WidgetNumbers>
                        <WidgetMoney className='WidgetTitle'>{userStats ? userStats : 0}</WidgetMoney>
                    </WidgetNumbers>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <WidgetTitle className='WidgetTitle' titleColor='#03a9f4'>Usuarios</WidgetTitle>
                        <BasicTooltip child={<TooltipIcon className='WidgetTitle'><HelpOutlineIcon style={{fontSize: '20px', color: "inherit", marginLeft: '5px' }} /></TooltipIcon>} title={'Usuarios totales y variación del mes en curso'} />
                    </div>
                    </Mobile>
                </Widget>
                <Widget bgcolor="#26a69a" to='/orders' >
                    <Top>
                        <WidgetIcon iconBgColor="#b2dfdb" iconColor="#26a69a">
                            <AttachMoneyIcon />
                        </WidgetIcon>
                        <WidgetRate>
                            <PercentageNumber2 className='PercentageNumber' percentage={income >= previousIncome ? true : false}>{ previousIncome > 0 ? new Intl.NumberFormat().format((income * 100 / previousIncome - 100).toFixed(1))  : 100 }%</PercentageNumber2>
                            <Icon percentage={income >= previousIncome ? true : false}>
                                {income >= previousIncome ? <ArrowUpwardIcon style={{fontSize: '20px'}} className='WidgetTitle' /> : <ArrowDownwardIcon style={{fontSize: '20px'}} className='WidgetTitle' />}
                            </Icon>
                        </WidgetRate>
                    </Top>
                    <Mobile>
                    <WidgetNumbers>
                        <WidgetMoney className='WidgetTitle'>$ {income ? new Intl.NumberFormat().format(income) : 0}</WidgetMoney>
                    </WidgetNumbers>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <WidgetTitle className='WidgetTitle' titleColor='#26a69a'>Mes pasado</WidgetTitle>
                        <BasicTooltip child={<TooltipIcon className='WidgetTitle'><HelpOutlineIcon style={{fontSize: '20px', color: "inherit", marginLeft: '5px' }} /></TooltipIcon>} title={'Ventas mes pasado y variación respecto al anterior'} />  
                    </div>
                    </Mobile>
                </Widget>
            </Center>
            <Right>
                <Widget bgcolor="#fb8c00" to='/orders' >
                    <Top>
                        <WidgetIcon iconBgColor="#fff3e0" iconColor="#fb8c00">
                            <LocalAtmRoundedIcon />
                        </WidgetIcon>
                        <WidgetRate>
                            <Number className='WidgetTitle'>{actualIncome && cashIncome ? new Intl.NumberFormat().format((cashIncome * 100 / actualIncome).toFixed(1)) : 0}  %</Number>
                        </WidgetRate>
                    </Top>
                    <Mobile>
                    <WidgetNumbers>
                        <WidgetMoney className='WidgetTitle'>$ {cashIncome ? new Intl.NumberFormat().format(cashIncome) : 0}</WidgetMoney>
                    </WidgetNumbers>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <WidgetTitle className='WidgetTitle' titleColor='#fb8c00'>Transferencias</WidgetTitle>
                        <BasicTooltip child={<TooltipIcon className='WidgetTitle'><HelpOutlineIcon style={{fontSize: '20px', color: "inherit", marginLeft: '5px' }} /></TooltipIcon>} title={'Composición porcentual y total de las ventas mensuales por transferencia'} />
                    </div>
                    </Mobile>
                </Widget>
                <Widget bgcolor="#e53935" to='/orders' >
                    <Top>
                        <WidgetIcon iconBgColor="#ffcdd2" iconColor="#e53935">
                            <CreditCardRoundedIcon />
                        </WidgetIcon>
                        <WidgetRate>
                            <Number className='WidgetTitle'>{actualIncome && cardIncome ? new Intl.NumberFormat().format((cardIncome * 100 / actualIncome).toFixed(1)) : 0}  %</Number>
                        </WidgetRate>
                    </Top>
                    <Mobile>
                    <WidgetNumbers>
                        <WidgetMoney className='WidgetTitle'>$ {cardIncome ? new Intl.NumberFormat().format(cardIncome) : 0}</WidgetMoney>
                    </WidgetNumbers>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <WidgetTitle className='WidgetTitle' titleColor='#e53935'>Mercadopago</WidgetTitle>
                        <BasicTooltip child={<TooltipIcon className='WidgetTitle'><HelpOutlineIcon style={{fontSize: '20px', color: "inherit", marginLeft: '5px' }} /></TooltipIcon>} title={'Composición porcentual y total de las ventas mensuales por mercado pago'} />
                    </div>
                    </Mobile>
                </Widget>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default PanelStats