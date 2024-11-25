import React from 'react';
import Detail from '../../components/Detail';
import Comment from '../../components/Comment';
// import LinkHeader from "../../components/LinkHeader";
// import { useParams } from 'react-router-dom';

const DetailPage = () => {
    // const { id } = useParams();
    return (
        <>
            {/* <LinkHeader /> */}
            <Detail />
            <Comment />
        </>
    )
}

export default DetailPage;