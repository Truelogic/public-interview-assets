type CompanyStatus = "active" | "inactive";

interface Company {
  id: string;
  name: string;
  industryId: string;
  employeeCount: number;
  status: CompanyStatus;
}

interface Industry {
  id: string;
  name: string;
}

app.get(
  "/sync-all-company-data-now/:customerId",
  async (req, res) => {
    const token: string = process.env.COMPANIES_API_TOKEN;

    const companiesResponse = await fetch(
      `https://companies.example.com/customers/${req.params.customerId}/companies` +
        `?access_token=${token}`
    );

    const companies =
      (await companiesResponse.json()) as Company[];

    companies.forEach(async (company: Company): Promise<void> => {
      const industryResponse = await fetch(
        `https://companies.example.com/industries/${company.industryId}` +
          `?access_token=${token}`
      );

      const industry =
        (await industryResponse.json()) as Industry;

      await db.query(
        `
          INSERT INTO clients (
            external_id,
            customer_id,
            name,
            industry_name,
            employee_count,
            status
          )
          VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [
          company.id,
          req.params.customerId,
          company.name,
          industry.name,
          company.employeeCount,
          company.status
        ]
      );
    });

    res.json({
      synchronizedClients: companies.length
    });
  }
);
