import z from "zod";
import { useForm } from "@tanstack/react-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FieldGroup, Field, FieldLabel, FieldError } from "../ui/field";
import { Button } from "../ui/button";
import { useAppStore } from "@/lib/appStore";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "../ui/combobox";
import React from "react";

const productFilterSchema = z.object({
  sortBy: z.enum(["name", "price"]),
  sortOrder: z.enum(["asc", "desc"]),
  brands: z.array(z.string()),
  categories: z.array(z.string()),
  priceRange: z.array(z.number()).length(2, "Must have a min and max price"),
});

interface FilterBounds {
  brand: string[];
  category: string[];
  minPrice: number;
  maxPrice: number;
}

interface FilterFormProp {
  bounds: FilterBounds;
}

const sortBy = [
  { label: "Name", value: "name" },
  { label: "Price", value: "price" },
];
const sortOrder = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

export default function ProductFilterForm({ bounds }: FilterFormProp) {
  const { loading } = useAppStore();
  const filterForm = useForm({
    defaultValues: {
      sortBy: "name" as "name" | "price",
      sortOrder: "asc" as "asc" | "desc",
      brands: [] as string[],
      categories: [] as string[],
      priceRange: [bounds?.minPrice || 0, bounds?.maxPrice || 999999999],
    },
    validators: {
      onSubmit: productFilterSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        console.log(value);
      } catch (err) {
        console.error(err);
      } finally {
      }
    },
  });

  const brandAnchor = useComboboxAnchor();
  const categoryAnchor = useComboboxAnchor();

  return (
    <Card className="w-full sm:max-w-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Filters</CardTitle>
        <CardDescription>Filter and find your product.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="filter-form"
          onSubmit={(e) => {
            e.preventDefault();
            filterForm.handleSubmit(e);
          }}
        >
          <FieldGroup>
            <filterForm.Field
              name="sortBy"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Sort</FieldLabel>

                    <Select
                      disabled={loading}
                      items={sortBy}
                      value={field.state.value}
                      onValueChange={(val) =>
                        field.handleChange(val as "name" | "price")
                      }
                    >
                      <SelectTrigger id={field.name}>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {sortBy.map((topic) => (
                            <SelectItem key={topic.value} value={topic.value}>
                              {topic.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            />

            <filterForm.Field
              name="sortOrder"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Sort Order</FieldLabel>

                    <Select
                      disabled={loading}
                      items={sortOrder}
                      value={field.state.value}
                      onValueChange={(val) =>
                        field.handleChange(val as "asc" | "desc")
                      }
                    >
                      <SelectTrigger id={field.name}>
                        <SelectValue placeholder="Ascending" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {sortOrder.map((topic) => (
                            <SelectItem key={topic.value} value={topic.value}>
                              {topic.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            />

            {/* Brand Filter */}
            <filterForm.Field
              name="brands"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Brand</FieldLabel>

                    <Combobox
                      multiple
                      autoHighlight
                      items={bounds.brand}
                      value={field.state.value}
                      onValueChange={(val) => field.handleChange(val)}
                    >
                      <ComboboxChips ref={brandAnchor}>
                        <ComboboxValue>
                          {(values) => (
                            <React.Fragment>
                              {values.map((value: string) => (
                                <ComboboxChip key={value}>{value}</ComboboxChip>
                              ))}
                              <ComboboxChipsInput />
                            </React.Fragment>
                          )}
                        </ComboboxValue>
                      </ComboboxChips>
                      <ComboboxContent anchor={brandAnchor}>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </Field>
                );
              }}
            />

            {/* Category Filter */}
            <filterForm.Field
              name="categories"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                    <Combobox
                      multiple
                      autoHighlight
                      items={bounds.category}
                      value={field.state.value}
                      onValueChange={(val) => field.handleChange(val)}
                    >
                      <ComboboxChips
                        ref={categoryAnchor}
                        className="w-full max-w-xs"
                      >
                        <ComboboxValue>
                          {(values) => (
                            <React.Fragment>
                              {values.map((value: string) => (
                                <ComboboxChip key={value}>{value}</ComboboxChip>
                              ))}
                              <ComboboxChipsInput />
                            </React.Fragment>
                          )}
                        </ComboboxValue>
                      </ComboboxChips>
                      <ComboboxContent anchor={categoryAnchor}>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </Field>
                );
              }}
            />

            {/* Price Range Slider */}
            <filterForm.Field
              name="priceRange"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field
                    data-invalid={isInvalid}
                    className="mx-auto grid w-full gap-3 pt-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Label htmlFor={field.name}>Price Range</Label>
                      <span className="text-muted-foreground text-sm">
                        {field.state.value[0]} - {field.state.value[1]}
                      </span>
                    </div>
                    <Slider
                      id={field.name}
                      value={field.state.value}
                      min={bounds.minPrice}
                      max={bounds.maxPrice}
                      step={100}
                      onValueChange={(value) =>
                        field.handleChange(value as number[])
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Field orientation="horizontal">
          <Button type="submit" form="filter-form" className="w-full">
            Apply Filters
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
