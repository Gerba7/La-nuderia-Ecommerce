import { css } from 'styled-components';


export const mobile = (props) => {
    return css`
        @media only screen and (max-width: 768px) {
            ${props}
        }
    `
}


export const tablet = (props) => {
    return css`
        @media only screen and (max-width: 1500px) {
            ${props}
        }
    `
}


export const tablet2 = (props) => {
    return css`
        @media only screen and (max-width: 1200px), (max-height: 750px) {
            ${props}
        }
    `
}