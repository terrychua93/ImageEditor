/** External Dependencies */
import styled from 'styled-components';
import Label from '@scaleflex/ui/core/label';

const StyledOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 214px;
`;

const StyledOptionPopupContent = styled.div`
  background: ${({ theme }) => theme.palette['bg-secondary']};
  box-shadow: 0px 1px 2px ${({ theme }) => theme.palette['light-shadow']};
  border-radius: 2px;
  overflow: visible;

  * {
    font-family: 'Roboto', sans-serif;
  }
`;

const StyledSpacedOptionFields = styled.div`
  padding: 8px 12px;
`;

const StyledHeadline = styled(Label)`
  font-weight: 500;
  margin-bottom: 12px;
`;

const StyledTwoColumnsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledColumn = styled.div`
  &:not(:first-child) {
    margin-left: 12px;
  }
`;

const StyledFlexFields = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: left;
  width: 100%;
  padding: 0px 5px;
  gap: 10px;
  &:first-child {
    gap: 5px;
  }
  p {
    min-height: 24px;
    color: rgba(118, 129, 132, 1);
    font-weight: normal;
    font-size: 12px;
    font-style: normal;
    line-height: 14px;
    &:first-child {
      margin: 0px;
      padding: 5px;
      padding-left: 0px;
    }
  }
`;

const StyledFlexWrapFields = styled.div`
  display: flex;
  flex-flow: wrap;
  width: 170px;
`;

const StyledIconWrapper = styled.div(
  ({ theme, addThinBorder, noMargin, secondaryIconColor }) => `
    cursor: pointer;
    display: flex;
    margin: 2px;
    width: 24px;
    height: 12px;
    justify-content: flex-start;
    align-items: flex-start;

    &:last-child {
      margin:5px 0px;
    }
    
    svg {
      vertical-align: middle;
      margin: 0 auto;
    }

    ${addThinBorder ? `border: 0.5px solid ${theme.palette['borders-secondary']}` : ''};
    color: ${secondaryIconColor ? '#959DA8' : ''};

    &[aria-selected='true'] {
      background: ${theme.palette['bg-primary-active']};

      * {
        color: ${theme.palette['accent-primary-active']};
      }
    }

    :hover {
      background: ${theme.palette['bg-primary-active']};
    }
  `,
);

export {
  StyledFlexFields,
  StyledFlexWrapFields,
  StyledHeadline,
  StyledTwoColumnsContainer,
  StyledColumn,
  StyledIconWrapper,
  StyledSpacedOptionFields,
  StyledOptions,
  StyledOptionPopupContent,
};
