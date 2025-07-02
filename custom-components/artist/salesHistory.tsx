"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, User, Package, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface Sale {
  id: string;
  artistCut: number;
  price: number;
  payoutStatus: "PAID" | "UNPAID";
  artwork: {
    id: string;
    title: string;
    imageUrl: string;
    user: {
      id: string;
      name: string | null;
      email: string | null;
      payoutMethod: string | null;
      payoutAccount: string | null;
      AccountHolderName: string | null;
    };
  };
  order: {
    id: string;
    totalAmount: number;
    createdAt: string;
    user: {
      name: string | null;
      email: string | null;
    };
  };
}

interface SalesHistoryProps {
  salesHistory: Sale[];
}

export default function SalesHistory({ salesHistory }: SalesHistoryProps) {
  const totalSales = salesHistory.length;
  const totalRevenue = salesHistory.reduce(
    (sum, sale) => sum + sale.artistCut,
    0
  );
  const paidSales = salesHistory.filter(
    (sale) => sale.payoutStatus === "PAID"
  ).length;
  const unpaidRevenue = salesHistory
    .filter((sale) => sale.payoutStatus === "UNPAID")
    .reduce((sum, sale) => sum + sale.artistCut, 0);

  const getPayoutStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "UNPAID":
        return <Badge className="bg-orange-100 text-orange-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  if (salesHistory.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <TrendingUp className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No sales yet
        </h3>
        <p className="text-gray-600">
          Your sales history will appear here once customers start purchasing
          your artworks
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sales Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">
              Total Sales
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{totalSales}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {totalRevenue.toLocaleString()} ETB
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">
              Paid Sales
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {paidSales}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">
              Pending Payout
            </CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {unpaidRevenue.toLocaleString()} ETB
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Sales</h3>
        {salesHistory.map((sale) => (
          <Card key={sale.id} className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg text-gray-900">
                      {sale.artwork.title}
                    </h4>
                    {getPayoutStatusBadge(sale.payoutStatus)}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Sold: {formatDate(sale.order.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>Customer: {sale.order.user.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      <span>Order: #{sale.order.id}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="text-sm text-gray-600">
                    Sale Price: {sale.price.toLocaleString()} ETB
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    Your Cut: {sale.artistCut.toLocaleString()} ETB
                  </div>
                  <div className="text-xs text-gray-500">80% of sale price</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
