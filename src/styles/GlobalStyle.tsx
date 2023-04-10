import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  ::selection {
    color: #000;
    background: #ffdcb1;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(192, 194, 192, 0.8);
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(192, 194, 192);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(192, 194, 192);
  }
  * {
    margin: 0;
    padding: 0;
  }

  html {
    min-height: 100%;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10px;
  }

  a {
    color: gray;
  }

  a:hover {
    color: #ffffff ;
    text-decoration: none ;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  ul li {
    margin-bottom: 0;
    line-height: 36px;
    position: relative;
    display: block;
    padding: 0;
  }

  hr {
    background-color: #1b90ff;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  p {
    margin-bottom: 0;
  }
  .ant-message-notice-content{
      border-radius: 3px;
      background-color: #B3EDFF;
      padding: 17px 20px;
      font-size: 14px;
  }
  .ant-message-notice-content > div {
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .ant-message-notice-content > div > span > svg {
      width: 27px;
      height:27px;
  }
  .listScroll {
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: #1b90ff #070707;

    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #070707;
    }

    ::-webkit-scrollbar {
      width: 5px;
      background-color: #1b90ff;
      display: none;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #1b90ff;
      border: 2px solid #555555;
    }
  }

  .listScroll:hover {
    ::-webkit-scrollbar {
      display: block;
    }
  }
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon {
        background: #00b147;
    }

.ant-steps-item-process .ant-steps-item-icon {
        border-color: #00b147;
  }

.ant-steps-item-finish .ant-steps-item-icon {
    border-color: #00b147;
}
.ant-steps-finish-icon > svg {
    fill: #00b147;
}
.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
    background-color: #00b147;
}
  .ant-list-item-meta-avatar {
    margin-right: 0 !important;
  }

  .ant-modal-header {
    background: #1b90ff;
    border-bottom: 2px solid #1b90ff;
  }

  .ant-modal-footer {
    background: white;
    border-top: 1px solid #1b90ff;
  }

  .ant-modal-title {
    font-weight: 900;
  }

  h1 {
    font-family: Roboto, sans-serif;
    font-size: 2rem;
    font-weight: 400;
    line-height: 40px;
    color: #000000;
    display: inline-block;
    padding: 0;
    margin: 0;
  }

  h5 {
    font-family: Roboto, sans-serif;
    font-weight: 400;
    line-height: 31px;
    color: #000000;
    display: inline-block;
    padding: 0;
    margin: 0;
  }
  @media(max-width: 1200px){
    .ant-message-notice-content{
      border-radius: 3px;
      background-color: rgba(0, 194, 255, 0.3);
      padding: 12px 15px;
      font-size: 12px;
    }
    .ant-message-notice-content > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .ant-message-notice-content > div > span > svg {
      width: 20px;
      height:20px;
    }
  }
`;

export default GlobalStyle;
