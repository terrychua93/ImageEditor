/** External Dependencies */
import styled from 'styled-components';

const StyledStrokeSpacedOptionFields = styled.div`
  width: 100%;
  p {
    color: rgba(118, 129, 132, 1);
    font-weight: bold;
    font-style: normal;
  }
`;

const StyledStrokeFlex = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-flow: row;
  align-items: flex-start;
  justify-content: left;
  width: 100%;
  padding: 0px 5px;

  Label {
    min-height: 24px;
    color: rgba(118, 129, 132, 1);
    font-weight: normal;
    font-style: normal;
  }
`;

const StyledFlex = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
`;

export { StyledStrokeSpacedOptionFields, StyledStrokeFlex, StyledFlex };
