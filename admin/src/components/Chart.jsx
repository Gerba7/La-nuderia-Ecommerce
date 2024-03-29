import styled from "styled-components";
import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
import { useEffect } from "react";
import privateRequest, { publicRequest } from "../api/axios";
import { useState } from "react";
import { mobile } from "../responsive";



const Container = styled.div`
    flex: 1.5;
    width: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
    ${mobile({width: '90vw', margin: '0px', display: 'none'})}
`


const ChartTitle = styled.h2`
    margin-top: 10px;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 10px;
`

const ChartContainer = styled.div`
    margin-top: 10px;
    width: 95%;
    display: flex;
    justify-content: center;
`



const Chart = ({title}) => {

  const [semester, setSemester] = useState();
  const [actualMonth, setActualMonth] = useState();
  const [previousMonth, setPreviousMonth] = useState();


  useEffect(() => {
      const getSemester = async () => {
          try {
              const res = await privateRequest.get("/orders/semester")
              const months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
              const sorter = (a, b) => {
                  if(a._id.year !== b._id.year){
                     return a._id.year - b._id.year;
                  }else{
                     return months.indexOf(a._id.month) - months.indexOf(b._id.month);
                  };
              };
              res.data.sort(sorter);
              setSemester(res.data)
              setActualMonth(res.data[res.data.length - 1].total)
              setPreviousMonth(res.data[res.data.length - 2].total)
          } catch (err) {
              console.log(err)
          }
      }
      getSemester()
  }, [])


  
  return (
    <Container>
        <ChartTitle>Ventas Semestrales</ChartTitle>
        <ChartContainer>
            <ResponsiveContainer aspect={ 2.5 / 1 }>
                
                <AreaChart width={730} height={250} data={semester}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={previousMonth > actualMonth ? '#f44336' : '#82ca9d'} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={previousMonth > actualMonth ? '#f44336' : '#82ca9d'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="_id.month" />
                  <YAxis tick={{ fontSize: 12, fill: 'black' }} dataKey="total" />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="total" stroke={previousMonth > actualMonth ? '#f44336' : '#82ca9d'} fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>

            </ResponsiveContainer>
        </ChartContainer>
    </Container>
  )
}

export default Chart