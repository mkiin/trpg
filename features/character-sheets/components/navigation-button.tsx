import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";

interface NavigationButtonProps extends ButtonProps {
  nextStep: () => void;
  prevStep: () => void;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  children,
  nextStep,
  prevStep
}) => {
  return (
    <div className="flex justify-between pt-4">
      <Button variant="outline" onClick={prevStep}>
        戻る
      </Button>
      {children}
      <Button onClick={nextStep}>
        次へ
      </Button>
    </div>
  );
};