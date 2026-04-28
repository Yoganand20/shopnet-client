import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Location01Icon,
  CreditCardIcon,
  Building04Icon,
  PlusSignIcon,
  CheckmarkCircle01Icon,
  SmartPhone01Icon,
  TruckIcon,
  Loading02Icon,
  ShoppingBag01Icon,
} from "@hugeicons/core-free-icons";
import { useAppStore } from "@/feature/appStore";
import { useShopStore } from "@/feature/shopStore";
import type { Address } from "@/lib/types";
import AddAddressForm, {
  type AddressFormData,
} from "@/components/form/AddAddressForm";
import { addAddress, placeOrder } from "@/services/shopService";

interface PaymentMethod {
  id: string;
  name: string;
  icon: any;
  enabled: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "pod",
    name: "Pay on Delivery",
    icon: TruckIcon,
    enabled: true,
  },
  {
    id: "upi",
    name: "UPI Apps (GPay, PhonePe)",
    icon: SmartPhone01Icon,
    enabled: false,
  },
  {
    id: "cc",
    name: "Credit Card",
    icon: CreditCardIcon,
    enabled: false,
  },
  {
    id: "dc",
    name: "Debit Card",
    icon: CreditCardIcon,
    enabled: false,
  },
  {
    id: "nb",
    name: "Net Banking",
    icon: Building04Icon,
    enabled: false,
  },
];

function AddressStep({
  addresses,
  selectedId,
  onSelect,
  onNext,
  onAddAddress,
}: {
  addresses: Address[];
  selectedId: string;
  onSelect: (id: string) => void;
  onNext: () => void;
  onAddAddress: (address: AddressFormData) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveAddress = (addressData: AddressFormData) => {
    onAddAddress(addressData);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-extrabold mb-1">
          Select Delivery Address
        </h2>
        <p className="text-gray-500 text-sm">
          Where should we deliver your order?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => {
          const isSelected = selectedId === addr.id;
          return (
            <div
              key={addr.id}
              onClick={() => onSelect(addr.id)}
              className={`relative flex flex-col gap-2 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                isSelected
                  ? "border-black dark:border-white bg-gray-50 dark:bg-gray-900"
                  : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
              }`}
            >
              {isSelected && (
                <HugeiconsIcon
                  icon={CheckmarkCircle01Icon}
                  className="absolute top-4 right-4 text-black dark:text-white size-6"
                />
              )}
              <div className="flex items-center gap-2 font-bold">
                <HugeiconsIcon icon={Location01Icon} className="size-5" />
                {addr.type}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span className="font-semibold text-black dark:text-white block">
                  {addr.name}
                </span>
                {addr.street} <br />
                {addr.city}, {addr.state} - {addr.pincode}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        variant="outline"
        className="w-full sm:w-auto self-start border-dashed border-2 h-14"
        onClick={() => setIsModalOpen(true)}
      >
        <HugeiconsIcon icon={PlusSignIcon} className="size-5 mr-2" />
        Add New Address
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>
          <AddAddressForm
            onSubmit={handleSaveAddress}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Separator className="my-2" />

      <Button
        className="w-full sm:w-64 h-12 text-lg"
        onClick={onNext}
        disabled={!selectedId}
      >
        Deliver Here
      </Button>
    </div>
  );
}

function PaymentStep({
  paymentMethods,
  selectedId,
  onSelect,
  onBack,
  onPlaceOrder,
  isPlacingOrder,
}: {
  paymentMethods: PaymentMethod[];
  selectedId: string;
  onSelect: (id: string) => void;
  onBack: () => void;
  onPlaceOrder: () => void;
  isPlacingOrder: boolean;
}) {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-right-8 duration-500">
      <div>
        <h2 className="text-2xl font-extrabold mb-1">Select Payment Method</h2>
        <p className="text-gray-500 text-sm">
          Choose how you want to pay for your order.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {paymentMethods.map((method) => {
          const isSelected = selectedId === method.id;
          return (
            <div
              key={method.id}
              onClick={() =>
                method.enabled && !isPlacingOrder && onSelect(method.id)
              }
              className={`relative flex items-center gap-4 p-4 border rounded-xl transition-all ${
                !method.enabled
                  ? "bg-gray-50/50 dark:bg-gray-900/20 border-gray-100 dark:border-gray-900 opacity-50 cursor-not-allowed grayscale"
                  : isSelected
                    ? "border-black dark:border-white bg-gray-50 dark:bg-gray-900 shadow-sm cursor-pointer"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300 cursor-pointer"
              } ${isPlacingOrder ? "pointer-events-none opacity-70" : ""}`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected
                    ? "border-black dark:border-white"
                    : "border-gray-300"
                }`}
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white" />
                )}
              </div>

              <HugeiconsIcon
                icon={method.icon}
                className="size-6 text-gray-700 dark:text-gray-300 shrink-0"
              />
              <div className="flex-1 font-semibold">{method.name}</div>

              {!method.enabled && (
                <span className="text-xs font-bold px-2 py-1 bg-gray-200 dark:bg-gray-800 text-gray-500 rounded uppercase tracking-wider">
                  Unavailable
                </span>
              )}
            </div>
          );
        })}
      </div>

      <Separator className="my-2" />

      <div className="flex gap-4">
        <Button
          variant="outline"
          className="h-12 w-full sm:w-32"
          onClick={onBack}
          disabled={isPlacingOrder}
        >
          Back
        </Button>
        <Button
          className="h-12 flex-1 sm:w-64"
          onClick={onPlaceOrder}
          disabled={isPlacingOrder || !selectedId}
        >
          {isPlacingOrder ? (
            <>
              <HugeiconsIcon
                icon={Loading02Icon}
                className="size-5 mr-2 animate-spin"
              />
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </Button>
      </div>
    </div>
  );
}

function OrderSuccessView({
  orderId,
  email,
}: {
  orderId: string;
  email: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 animate-in zoom-in-95 fade-in duration-500">
      <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
        <HugeiconsIcon
          icon={CheckmarkCircle01Icon}
          className="size-12 text-green-600 dark:text-green-500"
        />
      </div>
      <h1 className="text-4xl font-extrabold mb-4">
        Order Placed Successfully!
      </h1>
      <p className="text-gray-500 text-lg max-w-md mb-8">
        Thank you for your purchase. We've received your order and will send an
        email confirmation to{" "}
        <span className="font-bold text-black dark:text-white">{email}</span>{" "}
        shortly.
      </p>

      <div className="bg-gray-50 dark:bg-gray-900 border rounded-xl p-6 mb-10 min-w-75">
        <div className="text-sm text-gray-500 mb-1">Order Reference ID</div>
        <div className="text-xl font-bold font-mono tracking-wider">
          {orderId}
        </div>
      </div>

      <Button
        className="h-12 px-8 text-lg"
        onClick={() => window.location.reload()}
      >
        <HugeiconsIcon icon={ShoppingBag01Icon} className="size-5 mr-2" />
        Continue Shopping
      </Button>
    </div>
  );
}

function OrderSummary({
  totalItems,
  orderTotal,
  shipping,
  step,
  selectedAddress,
  addresses,
}: {
  totalItems: number;
  orderTotal: number;
  shipping: number;
  step: 1 | 2;
  selectedAddress: string;
  addresses: Address[];
}) {
  return (
    <Card className="shadow-lg border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl">Checkout Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Items ({totalItems})</span>
            <span className="font-medium">₹ {orderTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span className="text-green-600 font-medium">
              {shipping === 0 ? "Free" : `₹ ${shipping.toFixed(2)}`}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Total Amount</span>
          <span className="text-2xl font-extrabold">
            ₹ {(orderTotal + shipping).toFixed(2)}
          </span>
        </div>

        {/* Mini preview of selections */}
        {step === 2 && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm transition-all animate-in fade-in zoom-in-95">
            <div className="font-bold mb-1">Delivering to:</div>
            <div className="text-gray-600 dark:text-gray-400 truncate">
              {addresses.find((a) => a.id === selectedAddress)?.street}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function CheckoutPage() {
  const { cart, fetchCart, addresses, setAddresses, fetchAddresses } =
    useShopStore();
  const { setLoading } = useAppStore();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  const handleAddAddress = async (addressData: AddressFormData) => {
    try {
      const newAddress = await addAddress(addressData);
      setAddresses([...addresses, newAddress]);
      setSelectedAddress(newAddress.id);
    } catch (error) {
      console.error("Failed to add address:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true, "Loading checkout details...");
      try {
        await fetchCart();
        await fetchAddresses();
        const defaultPayment = paymentMethods.find((m) => m.enabled);
        if (defaultPayment) setSelectedPayment(defaultPayment.id);
      } catch (err) {
        console.error("Error fetching checkout details", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0].id);
    }
  }, [addresses, selectedAddress]);

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);

    setLoading(true, "Processing your order...");

    try {
      const address = addresses.find((a) => a.id === selectedAddress);
      if (!address) throw new Error("Address not found");

      const order = await placeOrder({
        addressId: selectedAddress,
        paymentMethod: selectedPayment,
        items: cart,
      });
      setPlacedOrderId(order.id);
    } catch (err) {
      console.error("Order placement failed", err);
    } finally {
      setIsPlacingOrder(false);
      setLoading(false);
    }
  };

  if (placedOrderId) {
    return (
      <OrderSuccessView orderId={placedOrderId} email="john.doe@example.com" />
    );
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const orderTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = 0; // Free shipping for now

  return (
    <div className="p-8 flex flex-row gap-20 justify-between">
      {/* LEFT SIDE: Dynamic Workflow Steps */}
      <div className="flex-1 w-full">
        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-8 text-sm font-bold tracking-widest uppercase">
          <span
            className={
              step === 1 ? "text-black dark:text-white" : "text-gray-400"
            }
          >
            1. Address
          </span>
          <span className="text-gray-300 dark:text-gray-700">----</span>
          <span
            className={
              step === 2 ? "text-black dark:text-white" : "text-gray-400"
            }
          >
            2. Payment
          </span>
        </div>

        {/* Step Content */}
        {step === 1 ? (
          <AddressStep
            addresses={addresses}
            selectedId={selectedAddress}
            onSelect={setSelectedAddress}
            onNext={() => setStep(2)}
            onAddAddress={handleAddAddress}
          />
        ) : (
          <PaymentStep
            paymentMethods={paymentMethods}
            selectedId={selectedPayment}
            onSelect={setSelectedPayment}
            onBack={() => setStep(1)}
            onPlaceOrder={handlePlaceOrder}
            isPlacingOrder={isPlacingOrder}
          />
        )}
      </div>

      <div className="w-100 shrink-0 sticky top-24">
        <OrderSummary
          totalItems={totalItems}
          orderTotal={orderTotal}
          shipping={shipping}
          step={step}
          selectedAddress={selectedAddress}
          addresses={addresses}
        />
      </div>
    </div>
  );
}

export default CheckoutPage;
