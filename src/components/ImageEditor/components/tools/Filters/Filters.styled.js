/** External Dependencies */
import Label from "@scaleflex/ui/core/label";
import { Stage } from "konva";
import styled from "styled-components";

const StyledFilterItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 4px;
  padding: 2px;
  cursor: pointer;
  border-radius: 2px;

  canvas {
    border-radius: 2px;
  }
`;

const FilterItemPreview = styled(Stage)`
  [aria-selected="true"] & {
    padding: 1px;
    border: 1px solid ${({ theme }) => theme.palette["accent-primary-active"]};
    border-radius: 2px;
  }
  ,
  [aria-selected="false"] & {
    padding: 1px;
    border: 1px solid transparent;
    border-radius: 2px;
  }
`;

const FilterItemLabel = styled(Label)`
  margin-top: 6px;
  font-size: 11px;
  line-height: 12px;

  [aria-selected="true"] & {
    color: ${({ theme }) => theme.palette["accent-primary-active"]};
  }
`;

export { StyledFilterItem, FilterItemPreview, FilterItemLabel };
