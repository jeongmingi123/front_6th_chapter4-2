import { memo } from "react";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { DAY_LABELS } from "../../constants.ts";

// 공통 타입 정의
interface SearchOption {
  query?: string;
  grades: number[];
  days: string[];
  times: number[];
  majors: string[];
  credits?: number | string;
}

// 시간 슬롯 상수
const TIME_SLOTS = [
  { id: 1, label: "09:00~09:30" },
  { id: 2, label: "09:30~10:00" },
  { id: 3, label: "10:00~10:30" },
  { id: 4, label: "10:30~11:00" },
  { id: 5, label: "11:00~11:30" },
  { id: 6, label: "11:30~12:00" },
  { id: 7, label: "12:00~12:30" },
  { id: 8, label: "12:30~13:00" },
  { id: 9, label: "13:00~13:30" },
  { id: 10, label: "13:30~14:00" },
  { id: 11, label: "14:00~14:30" },
  { id: 12, label: "14:30~15:00" },
  { id: 13, label: "15:00~15:30" },
  { id: 14, label: "15:30~16:00" },
  { id: 15, label: "16:00~16:30" },
  { id: 16, label: "16:30~17:00" },
  { id: 17, label: "17:00~17:30" },
  { id: 18, label: "17:30~18:00" },
  { id: 19, label: "18:00~18:50" },
  { id: 20, label: "18:55~19:45" },
  { id: 21, label: "19:50~20:40" },
  { id: 22, label: "20:45~21:35" },
  { id: 23, label: "21:40~22:30" },
  { id: 24, label: "22:35~23:25" },
];

// 숫자용 체크박스 그룹 컴포넌트
const NumberCheckboxGroup = memo(
  ({
    children,
    value,
    onChange,
    colorScheme,
  }: {
    children: React.ReactNode;
    value: number[];
    onChange: (value: number[]) => void;
    colorScheme?: string;
  }) => {
    // Chakra UI CheckboxGroup은 string[]을 기대하므로 변환
    const stringValue = value.map(String);
    const handleChange = (stringValues: string[]) => {
      onChange(stringValues.map(Number));
    };

    return (
      <CheckboxGroup
        value={stringValue}
        onChange={handleChange}
        colorScheme={colorScheme}
      >
        {children}
      </CheckboxGroup>
    );
  }
);

NumberCheckboxGroup.displayName = "NumberCheckboxGroup";

// 문자열용 체크박스 그룹 컴포넌트
const StringCheckboxGroup = memo(
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

StringCheckboxGroup.displayName = "StringCheckboxGroup";

// SearchInputFilter 컴포넌트
interface SearchInputFilterProps {
  searchOptions: SearchOption;
  onChange: (
    field: keyof SearchOption,
    value: SearchOption[typeof field]
  ) => void;
}

const SearchInputFilter = memo(
  ({ searchOptions, onChange }: SearchInputFilterProps) => {
    return (
      <HStack spacing={4}>
        <FormControl>
          <FormLabel>검색어</FormLabel>
          <Input
            placeholder="과목명 또는 과목코드"
            value={searchOptions.query || ""}
            onChange={(e) => onChange("query", e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>학점</FormLabel>
          <Select
            value={searchOptions.credits || ""}
            onChange={(e) => onChange("credits", e.target.value)}
          >
            <option value="">전체</option>
            <option value="1">1학점</option>
            <option value="2">2학점</option>
            <option value="3">3학점</option>
          </Select>
        </FormControl>
      </HStack>
    );
  }
);

SearchInputFilter.displayName = "SearchInputFilter";

// GradeFilter 컴포넌트
interface GradeFilterProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const GradeFilter = memo(({ value, onChange }: GradeFilterProps) => {
  return (
    <FormControl>
      <FormLabel>학년</FormLabel>
      <NumberCheckboxGroup value={value} onChange={onChange}>
        <HStack spacing={4}>
          {[1, 2, 3, 4].map((grade) => (
            <Checkbox key={grade} value={String(grade)}>
              {grade}학년
            </Checkbox>
          ))}
        </HStack>
      </NumberCheckboxGroup>
    </FormControl>
  );
});

GradeFilter.displayName = "GradeFilter";

// DayFilter 컴포넌트
interface DayFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const DayFilter = memo(({ value, onChange }: DayFilterProps) => {
  return (
    <FormControl>
      <FormLabel>요일</FormLabel>
      <StringCheckboxGroup value={value} onChange={onChange}>
        <HStack spacing={4}>
          {DAY_LABELS.map((day) => (
            <Checkbox key={day} value={day}>
              {day}
            </Checkbox>
          ))}
        </HStack>
      </StringCheckboxGroup>
    </FormControl>
  );
});

DayFilter.displayName = "DayFilter";

// TimeFilter 컴포넌트
interface TimeFilterProps {
  value: number[];
  onChange: (values: number[]) => void;
}

const TimeFilter = memo(({ value, onChange }: TimeFilterProps) => {
  return (
    <FormControl>
      <FormLabel>시간</FormLabel>
      <NumberCheckboxGroup
        colorScheme="green"
        value={value}
        onChange={onChange}
      >
        <Wrap spacing={1} mb={2}>
          {value
            .sort((a, b) => a - b)
            .map((time) => (
              <Tag key={time} size="sm" variant="outline" colorScheme="blue">
                <TagLabel>{time}교시</TagLabel>
                <TagCloseButton
                  onClick={() => onChange(value.filter((v) => v !== time))}
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
          {TIME_SLOTS.map(({ id, label }) => (
            <Box key={id}>
              <Checkbox size="sm" value={String(id)}>
                {id}교시({label})
              </Checkbox>
            </Box>
          ))}
        </Stack>
      </NumberCheckboxGroup>
    </FormControl>
  );
});

TimeFilter.displayName = "TimeFilter";

// MajorFilter 컴포넌트
interface MajorFilterProps {
  value: string[];
  onChange: (values: string[]) => void;
  allMajors: string[];
}

const MajorFilter = memo(({ value, onChange, allMajors }: MajorFilterProps) => {
  return (
    <FormControl>
      <FormLabel>전공</FormLabel>
      <StringCheckboxGroup
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
              <Checkbox size="sm" value={major}>
                {major.replace(/<p>/gi, " ")}
              </Checkbox>
            </Box>
          ))}
        </Stack>
      </StringCheckboxGroup>
    </FormControl>
  );
});

MajorFilter.displayName = "MajorFilter";

// 메인 SearchControls 컴포넌트
interface SearchControlsProps {
  searchOptions: SearchOption;
  onChange: (
    field: keyof SearchOption,
    value: SearchOption[typeof field]
  ) => void;
  allMajors: string[];
}

const SearchControls = memo(
  ({ searchOptions, onChange, allMajors }: SearchControlsProps) => {
    return (
      <VStack spacing={4} align="stretch">
        <SearchInputFilter searchOptions={searchOptions} onChange={onChange} />

        <HStack spacing={4}>
          <GradeFilter
            value={searchOptions.grades}
            onChange={(value) => onChange("grades", value.map(Number))}
          />
          <DayFilter
            value={searchOptions.days}
            onChange={(value) => onChange("days", value as string[])}
          />
        </HStack>

        <HStack spacing={4}>
          <TimeFilter
            value={searchOptions.times}
            onChange={(values) => onChange("times", values.map(Number))}
          />
          <MajorFilter
            value={searchOptions.majors}
            onChange={(values) => onChange("majors", values as string[])}
            allMajors={allMajors}
          />
        </HStack>
      </VStack>
    );
  }
);

SearchControls.displayName = "SearchControls";

// 네임스페이스 객체로 export
const SearchControlsNamespace = {
  SearchInputFilter,
  GradeFilter,
  DayFilter,
  TimeFilter,
  MajorFilter,
  // 메인 컨테이너 컴포넌트도 포함
  Container: SearchControls,
};

// 기본 export는 네임스페이스 객체
export default SearchControlsNamespace;

// 개별 컴포넌트들도 named export로 제공
export {
  SearchInputFilter,
  GradeFilter,
  DayFilter,
  TimeFilter,
  MajorFilter,
  SearchControls,
};
