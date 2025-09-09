import { memo } from "react";
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { DAY_LABELS } from "../../constants.ts";

interface DayFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

// 체크박스 그룹 컴포넌트를 메모이제이션
const MemoizedCheckboxGroup = memo(
  ({
    children,
    value,
    onChange,
  }: {
    children: React.ReactNode;
    value: string[];
    onChange: (value: string[]) => void;
  }) => (
    <CheckboxGroup value={value} onChange={onChange}>
      {children}
    </CheckboxGroup>
  )
);

/**
 * 요일 필터 컴포넌트
 * 월요일부터 금요일까지의 체크박스를 제공하여 요일별 필터링을 가능하게 합니다.
 */
export const DayFilter = memo(({ value, onChange }: DayFilterProps) => {
  return (
    <FormControl>
      <FormLabel>요일</FormLabel>
      <MemoizedCheckboxGroup value={value} onChange={onChange}>
        <HStack spacing={4}>
          {DAY_LABELS.map((day) => (
            <Checkbox key={day} value={day}>
              {day}
            </Checkbox>
          ))}
        </HStack>
      </MemoizedCheckboxGroup>
    </FormControl>
  );
});

DayFilter.displayName = "DayFilter";
