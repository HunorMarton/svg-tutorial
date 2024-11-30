export default `

/* This is the same code as in the highlight.scss file */
code:has([data-highlight]) .ec-line {

    /* Turn off line markers */
    background-color: transparent;
    transition: background-color 0.3s;
    
    .code {
        border-color: transparent;

        &::before {
            color: transparent;
        }
    }

    /* Turn off annotation markers */
    mark,
    ins,
    del {
        background-color: transparent;
    }

    mark::before,
    ins::before,
    del::before {
        opacity: 0.5;
    }
}

/* Add new line markers */
/* This is the same code as in the highlight.scss file */
code .ec-line[data-highlight] {
    background-color: rgba(38, 74, 137, 0.5) !important;

    .code {
        border-color: rgba(85, 112, 179, 0.816);
    }
}

`;
