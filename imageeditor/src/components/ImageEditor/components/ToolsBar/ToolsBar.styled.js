/** External Dependencies */
import styled from 'styled-components';
import Label from '@scaleflex/ui/core/label';

const StyledToolsBar = styled.div`
  // padding: 0 12px 12px 0;
  //width: fit-content;
  //width: 100%;
  // margin: 0 auto;
  //max-width: 99.5%;
  //max-height: 92px;

  width: 100%;
  overflow-y: auto;
  [data-phone='true'] & {
    max-height: initial;
    margin-top: 8px;
    padding: 0;
  }
`;

const StyledToolsBarItems = styled.div`
  display: flex;
  flex-direction: column;

  [data-phone='true'] & {
    background: ${({ theme }) => theme.palette['bg-primary']};
  }
`;

const StyledToolsBarItemButton = styled.div(
  ({ theme }) => `
    display: flex;
    border-radius: 2px;
    align-items: center;
    justify-content: left;
    // padding: 8px 0 8px 0;
    padding: 10px;
    background-color: #f8fafb;
    margin: 5px 0px;
    border-radius: 5px;
    // &:not(:last-child) {
    //   margin-right: 8px;
    // }

    &,
    * {
      cursor: pointer;
    }

    &:hover {
      background: ${theme.palette['bg-primary-active']};
    }

    &[aria-selected='true'] {
      background: ${theme.palette['bg-primary-active']};

      * {
        color: ${theme.palette['accent-primary-active']};
      }
    }
  `,
);

const StyledToolsBarItemButtonLabel = styled(Label)`
  margin-left: 6px;
`;

const StyledToolsBarItemOptionsWrapper = styled.div`
  position: relative;
  //width: 100%;
  transition: max-height 100ms ease-in-out;
  display: flex;
  justify-content: left;
  align-items: center;

  width: 100%;
  // ${(props) => `
  //     max-height: ${props.hasChildren ? '40px' : 0};
  //     margin: ${props.hasChildren ? '0 auto 8px' : 0};
  //   `};
`;

export {
  StyledToolsBar,
  StyledToolsBarItems,
  StyledToolsBarItemButton,
  StyledToolsBarItemButtonLabel,
  StyledToolsBarItemOptionsWrapper,
};
