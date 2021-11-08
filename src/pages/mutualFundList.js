import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import { getAll } from '../services';

const MutualFundItem = () => {
    const router = useParams();
    const { id } = router;
    useEffect(() => {
        getAll(`https://api.mfapi.in/mf/${id}`)
            .then((data) => {
                console.log(data);
            });
    }, [id]);
    return (
        <div>
            into mutual fnd item personal;
        </div>
    );
};

export default MutualFundItem;