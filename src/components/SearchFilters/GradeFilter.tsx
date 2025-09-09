import { memo } from "react";
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";

interface GradeFilterProps {
  value: number[];
  onChange: (value: number[]) => void;
}

// 체크박스 그룹 컴포넌트를 메모이제이션
const MemoizedCheckboxGroup = memo(
  ({
    children,
    value,
    onChange,
  }: {
    children: React.ReactNode;
    value: number[];
    onChange: (value: number[]) => void;
  }) => (
    <CheckboxGroup value={value} onChange={onChange}>
      {children}
    </CheckboxGroup>
  )
);

/**
 * 학년 필터 컴포넌트
 * 1학년부터 4학년까지의 체크박스를 제공하여 학년별 필터링을 가능하게 합니다.
 */
export const GradeFilter = memo(({ value, onChange }: GradeFilterProps) => {
  return (
    <FormControl>
      <FormLabel>학년</FormLabel>
      <MemoizedCheckboxGroup value={value} onChange={onChange}>
        <HStack spacing={4}>
          {[1, 2, 3, 4].map((grade) => (
            <Checkbox key={grade} value={grade}>
              {grade}학년
            </Checkbox>
          ))}
        </HStack>
      </MemoizedCheckboxGroup>
    </FormControl>
  );
});

GradeFilter.displayName = "GradeFilter";
