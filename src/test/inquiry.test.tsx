import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { InquiryForm } from "../components/corporate";
import { company } from "../data/company";

afterEach(cleanup);
describe("Business inquiry handoff", () => {
  it("preserves shipment fields and creates an accurate WhatsApp draft without claiming submission", () => {
    render(<InquiryForm shipment />);
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Test Customer" } });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "customer@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone number"), { target: { value: "+919876543210" } });
    fireEvent.change(screen.getByLabelText("Service required"), {
      target: { value: "Warehouse Rental Services" },
    });
    fireEvent.change(screen.getByLabelText("Delivery city"), { target: { value: "Pune" } });
    fireEvent.change(screen.getByLabelText("Shipment type"), { target: { value: "Regular" } });
    fireEvent.submit(screen.getByRole("button", { name: "Prepare Inquiry" }).closest("form")!);
    const url = new URL(
      screen.getByRole("link", { name: "Send via WhatsApp" }).getAttribute("href")!,
    );
    expect(url.pathname).toBe("/" + company.whatsapp);
    expect(url.searchParams.get("text")).toContain("Delivery city: Pune");
    expect(url.searchParams.get("text")).toContain("Shipment type: Regular");
    expect(url.searchParams.get("text")).toContain("Service: Warehouse Rental Services");
    expect(screen.getByText(/No inquiry has been submitted yet/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Delivery city'),{target:{value:'Mumbai'}});
    expect(screen.queryByRole('link',{name:'Send via WhatsApp'})).not.toBeInTheDocument();
  });
});
