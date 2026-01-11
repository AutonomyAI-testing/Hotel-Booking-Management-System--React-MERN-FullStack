import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { CheckCircle, List, CheckSquare } from "lucide-react";

type CheckboxOption = {
  id: string;
  label: string;
};

const checkboxOptions: CheckboxOption[] = [
  { id: "option1", label: "Free WiFi" },
  { id: "option2", label: "Parking" },
  { id: "option3", label: "Airport Shuttle" },
  { id: "option4", label: "Family Rooms" },
  { id: "option5", label: "Non-Smoking Rooms" },
  { id: "option6", label: "Outdoor Pool" },
  { id: "option7", label: "Spa" },
  { id: "option8", label: "Fitness Center" },
];

const CheckboxScreen = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxChange = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleSelectAll = () => {
    setSelectedOptions(checkboxOptions.map((option) => option.id));
  };

  const handleDeselectAll = () => {
    setSelectedOptions([]);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    console.log("Selected options:", selectedOptions);
    
    // Simulate async operation
    setTimeout(() => {
      alert(`You selected ${selectedOptions.length} option(s)`);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Modern Card Container */}
        <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600"></div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-100 rounded-full opacity-50"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-200 rounded-full opacity-30"></div>

          {/* Header */}
          <CardHeader className="text-center relative z-10 pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              Checkbox Selection
            </CardTitle>
            <CardDescription className="text-gray-600">
              Select your preferred options from the list below
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10 space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                type="button"
                className="transition-all duration-200 hover:scale-105"
              >
                <List className="w-4 h-4 mr-2" />
                Select All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeselectAll}
                type="button"
                className="transition-all duration-200 hover:scale-105"
              >
                Deselect All
              </Button>
            </div>

            <Separator className="bg-gray-200" />

            {/* Checkbox Options */}
            <div className="space-y-2">
              {checkboxOptions.map((option) => {
                const isSelected = selectedOptions.includes(option.id);
                return (
                  <label
                    key={option.id}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-primary-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-primary-200 group"
                  >
                    <input
                      type="checkbox"
                      className="rounded w-5 h-5 cursor-pointer transition-all duration-200"
                      checked={isSelected}
                      onChange={() => handleCheckboxChange(option.id)}
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {option.label}
                    </span>
                    {isSelected && (
                      <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                    )}
                  </label>
                );
              })}
            </div>

            <Separator className="bg-gray-200" />

            {/* Selection Summary */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-primary-600 border-primary-200 bg-primary-50 px-3 py-1"
                >
                  {selectedOptions.length} of {checkboxOptions.length} selected
                </Badge>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              type="button"
              disabled={selectedOptions.length === 0 || isSubmitting}
              className="w-full py-3 px-4 rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Submit Selection
                </div>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckboxScreen;
