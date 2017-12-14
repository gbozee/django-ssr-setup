import React from 'react'
import styled, {css} from 'styled-components'
const Div = styled.div`${props=>props.css}`
export default () => <Div css={css`
    margin-top: 20px;
    h2{
        font-size: 25px;
        line-height: 25px;
        margin-top: 0;
        color: green;
    }
    p{
        margin-top: 0;
        margin-bottom: 0;
        color: gray;
    }
`}>
    <h2>This is the heading of the new page</h2>
    <p> ejwo jewojeo wjeowj oejwoe owejo wejiwjeoi weoijwghwfjakhea efhak eawf</p>
</Div>