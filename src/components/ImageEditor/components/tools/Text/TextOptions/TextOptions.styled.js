/** External Dependencies */
import styled from 'styled-components';
import Input from '@scaleflex/ui/core/input';
import Select from '@scaleflex/ui/core/select';

const StyledFontFamilySelect = styled(Select)`
  width: 88px;
  //margin: 0 4px;
  margin: 4px;
`;

const StyledFontSizeInput = styled(Input)`
  //width: 70px;
  //margin: 0 4px;

  width: 60px;
  margin: 4px;
`;

const StyledBorderLineBox = styled.div`
  padding: 8px 5px;
  border: 1px solid rgba(223, 231, 237, 1);
  border-radius: 2px;
  width: 100%;
`;

const StyledFlexRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export { StyledFontFamilySelect, StyledFontSizeInput, StyledBorderLineBox, StyledFlexRowWrapper };
