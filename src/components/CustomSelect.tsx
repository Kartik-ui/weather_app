import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomSelectProps {
  placeholder: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  value: string;
  className?: string;
}

const CustomSelect = ({
  placeholder,
  onChange,
  options,
  value,
}: CustomSelectProps) => {
  return (
    <Select value={value} onValueChange={(newValue) => onChange(newValue)}>
      <SelectTrigger className="w-[11.25rem]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option, index) => (
          <SelectItem key={index} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
