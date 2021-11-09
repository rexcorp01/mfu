import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { getAll } from '../services';
import { Line } from 'react-chartjs-2';

const MutualFundItem = () => {
    const [graphData, setGraphData] = useState({label: [], dataSet: []});
    const data = {
        labels: graphData.label,
        datasets: [
            {
            label: 'Standard Chartered Mutual Fund',
            data: graphData.dataSet,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };
    
    const options = {
        scales: {
            y: {
                beginAtZero: false
            }
        },
        maintainAspectRatio: true
    };

    const graphDataMethod = (response) => {
        let date = [];
        let value = [];
        response.data.map((datam) => {
            // console.log(datam)
            date.push(datam.date);
            value.push(datam.nav);
        });
        // console.log(date, value)
        setGraphData({label: date, dataSet: value})
    };
    const router = useParams();
    const [itemDetail, setItemDetail] = useState(null);
    const { id } = router;
    useEffect(() => {
        getAll(`https://api.mfapi.in/mf/${id}`)
            .then((response) => {
                // console.log(data);
                if (response) {
                    setItemDetail(response);
                    graphDataMethod(response);
                    return;
                } else {
                    setItemDetail({ error: 'Sorry there is error fetching data' });
                }
            });
    }, [id]);
    return (
        <>
            <main>
                <article>
                    <div className="container">
                        {!itemDetail && <>
                            <div className="spinner-container">
                                <div className="spinner-border"></div>
                                <span>Please wait! The page is getting ready...</span>
                            </div>
                        </>}
                        {(itemDetail && itemDetail.error) && <>
                            <div className="spinner-container">
                                
                                <span>{ itemDetail.error}</span>
                            </div>
                        </>}
                        {(itemDetail && !itemDetail.error) && <>
                            <div className="info-block">
                                <div className="graph-block">
                                    <Line data={data} options={options} />
                                </div>
                                <hr className="block-underline" />
                                <h4 className="title-of-item h4"><span className="label">Scheme Name: </span>{ itemDetail.meta.scheme_name}</h4>
                                <h4 className="sub-title-of-item h4"><span className="label">Fund House: </span>{ itemDetail.meta.fund_house}</h4>
                                <p className="info-of-item"><span>Scheme Category: {itemDetail.meta.scheme_category}</span> <span>Scheme Type: { itemDetail.meta.scheme_type}</span></p>
                            </div>
                        </>}
                    </div>
                </article>
            </main>
        </>
    );
};

export default MutualFundItem;