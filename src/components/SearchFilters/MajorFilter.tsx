import { memo, useMemo, useCallback } from "react";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
} from "@chakra-ui/react";

interface MajorFilterProps {
  value: string[];
  onChange: (values: string[]) => void;
  allMajors: string[];
}

// 전공 데이터 전처리 타입
interface ProcessedMajor {
  original: string;
  display: string;
  tagDisplay: string;
}

// 전공 데이터 전처리 함수
const processMajor = (major: string): ProcessedMajor => ({
  original: major,
  display: major.replace(/<p>/gi, " "),
  tagDisplay: major.split("<p>").pop() || major,
});

// 개별 체크박스 컴포넌트 메모이제이션
const MemoizedCheckbox = memo(
  ({ major, isChecked }: { major: ProcessedMajor; isChecked: boolean }) => (
    <Box>
      <Checkbox size="sm" value={major.original} isChecked={isChecked}>
        {major.display}
      </Checkbox>
    </Box>
  )
);

MemoizedCheckbox.displayName = "MemoizedCheckbox";

// 개별 태그 컴포넌트 메모이제이션
const MemoizedTag = memo(
  ({ major, onRemove }: { major: ProcessedMajor; onRemove: () => void }) => (
    <Tag size="sm" variant="outline" colorScheme="blue">
      <TagLabel>{major.tagDisplay}</TagLabel>
      <TagCloseButton onClick={onRemove} />
    </Tag>
  )
);

MemoizedTag.displayName = "MemoizedTag";

// 체크박스 그룹 컴포넌트를 메모이제이션
const MemoizedCheckboxGroup = memo(
  ({
    children,
    value,
    onChange,
    colorScheme,
  }: {
    children: React.ReactNode;
    value: string[];
    onChange: (value: string[]) => void;
    colorScheme?: string;
  }) => (
    <CheckboxGroup value={value} onChange={onChange} colorScheme={colorScheme}>
      {children}
    </CheckboxGroup>
  )
);

MemoizedCheckboxGroup.displayName = "MemoizedCheckboxGroup";

export const MajorFilter = memo(
  ({ value, onChange, allMajors }: MajorFilterProps) => {
    return (
      <FormControl>
        <FormLabel>전공</FormLabel>
        <MemoizedCheckboxGroup
          colorScheme="green"
          value={value}
          onChange={onChange}
        >
          <Wrap spacing={1} mb={2}>
            {value.map((major) => (
              <Tag key={major} size="sm" variant="outline" colorScheme="blue">
                <TagLabel>{major.split("<p>").pop()}</TagLabel>
                <TagCloseButton
                  onClick={() => onChange(value.filter((v) => v !== major))}
                />
              </Tag>
            ))}
          </Wrap>
          <Stack
            spacing={2}
            overflowY="auto"
            h="100px"
            border="1px solid"
            borderColor="gray.200"
            borderRadius={5}
            p={2}
          >
            {allMajors.map((major) => (
              <Box key={major}>
                <Checkbox key={major} size="sm" value={major}>
                  {major.replace(/<p>/gi, " ")}
                </Checkbox>
              </Box>
            ))}
          </Stack>
        </MemoizedCheckboxGroup>
      </FormControl>
    );
  }
);

MajorFilter.displayName = "MajorFilter";
