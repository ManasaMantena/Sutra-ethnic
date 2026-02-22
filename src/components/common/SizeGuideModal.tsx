import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
}

const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Size Guide</DialogTitle>
          <DialogDescription className="mt-2">
            Find the right fit for your garment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* size table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b py-2">Size</th>
                  <th className="border-b py-2">Bust (inches)</th>
                  <th className="border-b py-2">Waist</th>
                  <th className="border-b py-2">Hip</th>
                  <th className="border-b py-2">Length</th>
                </tr>
              </thead>
              <tbody>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => (
                  <tr key={s} className="odd:bg-muted/10">
                    <td className="py-2 pr-4 font-medium">{s}</td>
                    <td className="py-2 pr-4">{s === 'XS' ? '32' : s === 'S' ? '34' : s === 'M' ? '36' : s === 'L' ? '38' : s === 'XL' ? '40' : '42'}</td>
                    <td className="py-2 pr-4">{s === 'XS' ? '24' : s === 'S' ? '26' : s === 'M' ? '28' : s === 'L' ? '30' : s === 'XL' ? '32' : '34'}</td>
                    <td className="py-2 pr-4">{s === 'XS' ? '34' : s === 'S' ? '36' : s === 'M' ? '38' : s === 'L' ? '40' : s === 'XL' ? '42' : '44'}</td>
                    <td className="py-2 pr-4">{s === 'XS' ? '58' : s === 'S' ? '59' : s === 'M' ? '60' : s === 'L' ? '61' : s === 'XL' ? '62' : '63'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* measurement guide */}
          <div className="space-y-2">
            <p className="text-sm">
              Measure around the fullest part of your bust, natural waistline, and hips.
            </p>
            <div className="w-full h-40 bg-secondary flex items-center justify-center text-muted-foreground">
              {/* placeholder for illustration */}
              <span className="text-xs">[Measurement Diagram]</span>
            </div>
          </div>

          {/* note */}
          <p className="text-xs text-muted-foreground">
            Garment measurements may vary by 1–2 inches depending on design.
          </p>
        </div>

        <DialogClose className="sr-only">Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideModal;
